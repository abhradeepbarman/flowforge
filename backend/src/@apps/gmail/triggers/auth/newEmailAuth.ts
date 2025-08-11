import crypto from "crypto";
import { NextFunction, Request, Response } from "express";
import url from "url";
import { googleOAuthClient } from "../../../../config/googleOAuthClient";

export const newEmailLogin = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const scopes = ["https://www.googleapis.com/auth/gmail.readonly	"];

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
};

export const newEmailCallback = async (
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
            const user = await googleOAuthClient.getToken(qry.code as string);
            console.log("user", user);
        }

        return res.redirect("/");
    } catch (error) {
        return next(error);
    }
};
