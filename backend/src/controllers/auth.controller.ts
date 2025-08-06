import crypto from "crypto";
import { eq } from "drizzle-orm";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import url from "url";
import config from "../config";
import { googleOAuthClient, scopes } from "../config/googleOAuthClient";
import { db } from "../db";
import { users } from "../db/schema";
import CustomErrorHandler from "../utils/CustomErrorHandler";

const authControllers = {
    googleLogin: (req: Request, res: Response, next: NextFunction) => {
        try {
            const state = crypto.randomBytes(32).toString("hex");
            (req.session as any).state = state;

            const authorizationUrl = googleOAuthClient.generateAuthUrl({
                access_type: "offline",
                scope: scopes,
                include_granted_scopes: true,
                state: state,
            });

            return res.redirect(authorizationUrl);
        } catch (error) {
            return next(error);
        }
    },

    googleLoginCallback: async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            let qry = url.parse(req.url, true).query;

            if (qry.error) {
                return next(qry.error);
            } else if (qry.state !== (req.session as any).state) {
                return next("Invalid state parameter");
            } else {
                const { tokens } = await googleOAuthClient.getToken(
                    qry.code as string
                );

                // get user email
                const user = await googleOAuthClient.verifyIdToken({
                    idToken: tokens.id_token as string,
                    audience: config.GOOGLE_CLIENT_ID,
                });

                if (!user) {
                    return next(CustomErrorHandler.wrongCredentials());
                }

                const userEmail = user.getPayload()?.email;
                const userName = user.getPayload()?.name;
                if (!userEmail || !userName) {
                    return next(CustomErrorHandler.wrongCredentials());
                }

                let existingUser = await db.query.users.findFirst({
                    where: eq(users.email, userEmail),
                });

                if (!existingUser) {
                    // create new user
                    existingUser = (
                        await db
                            .insert(users)
                            .values({
                                name: userName,
                                email: userEmail,
                            })
                            .returning()
                    )[0];
                }

                const { accessToken, refreshToken } =
                    authControllers.generateTokens(existingUser.id);

                // save refresh token
                await db
                    .update(users)
                    .set({
                        refreshToken,
                    })
                    .where(eq(users.id, existingUser.id));

                return res
                    .cookie("access_token", accessToken, {
                        httpOnly: true,
                        sameSite: "strict",
                        secure: false,
                        maxAge: 60 * 60 * 1000,
                    })
                    .cookie("refresh_token", refreshToken, {
                        httpOnly: true,
                        sameSite: "strict",
                        secure: false,
                        maxAge: 7 * 24 * 60 * 60 * 1000,
                    })
                    .redirect(
                        `${config.FRONTEND_URL}/flows?token=${accessToken}&userId=${existingUser.id}`
                    );
            }
        } catch (error) {
            return next(error);
        }
    },

    logout: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = req.user.id;

            await db
                .update(users)
                .set({
                    refreshToken: null,
                })
                .where(eq(users.id, userId));

            return res
                .clearCookie("access_token")
                .clearCookie("refresh_token")
                .redirect(`${config.FRONTEND_URL}/login`);
        } catch (error) {
            return next(error);
        }
    },

    generateTokens: (userId: string) => {
        const accessToken = jwt.sign({ id: userId }, config.JWT_SECRET, {
            expiresIn: "1h",
        });
        const refreshToken = jwt.sign({ id: userId }, config.JWT_SECRET, {
            expiresIn: "7d",
        });
        return { accessToken, refreshToken };
    },

    refreshAccessToken: async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const refreshToken = req.cookies.refresh_token as string;

            if (!refreshToken) {
                return next(CustomErrorHandler.unAuthorized("Invalid token"));
            }

            const user = jwt.verify(refreshToken, config.JWT_SECRET) as {
                id: string;
            };
            if (!user) {
                return next(CustomErrorHandler.unAuthorized("Invalid token"));
            }

            const userDetails = await db.query.users.findFirst({
                where: eq(users.id, user.id),
            });

            if (!userDetails) {
                return next(CustomErrorHandler.unAuthorized("Invalid token"));
            }

            const { accessToken, refreshToken: newRefreshToken } =
                authControllers.generateTokens(user.id);

            return res
                .cookie("access_token", accessToken, {
                    httpOnly: true,
                    sameSite: "strict",
                    secure: false,
                    maxAge: 60 * 60 * 1000,
                })
                .cookie("refresh_token", newRefreshToken, {
                    httpOnly: true,
                    sameSite: "strict",
                    secure: false,
                    maxAge: 7 * 24 * 60 * 60 * 1000,
                })
                .json({ access_token: accessToken, id: userDetails.id });
        } catch (error) {
            return next(error);
        }
    },
};

export default authControllers;
