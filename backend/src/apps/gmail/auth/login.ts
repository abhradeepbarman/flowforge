import crypto from "crypto";
import { NextFunction, Request, Response } from "express";
import { google } from "googleapis";
import config from "../../../config";

export const login = (
    appKey: string,
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const scopes = ["https://www.googleapis.com/auth/gmail.readonly"];

    try {
        const state = crypto.randomBytes(32).toString("hex");
        (req.session as any).state = state;

        const googleOAuthClient = new google.auth.OAuth2(
            config.GOOGLE_CLIENT_ID,
            config.GOOGLE_CLIENT_SECRET,
            `${config.BACKEND_URL}/api/v1/app/callback?app=${appKey}`,
        );

        const authorizationUrl = googleOAuthClient.generateAuthUrl({
            access_type: "offline",
            scope: scopes,
            include_granted_scopes: true,
            state: state,
        });

        console.log("authorizationUrl", authorizationUrl);

        return res.redirect(authorizationUrl);
    } catch (error) {
        return next(error);
    }
};
