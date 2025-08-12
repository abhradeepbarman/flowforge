import { NextFunction, Request, Response } from "express";
import url from "url";
import config from "../../../config";
import { google } from "googleapis";

export const callback = async (
    appKey: string,
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        let qry = url.parse(req.url, true).query;

        if (qry.error) {
            return next(qry.error);
        } else if (qry.state !== (req.session as any).state) {
            return next("Invalid state parameter");
        } else {
            const googleOAuthClient = new google.auth.OAuth2(
                config.GOOGLE_CLIENT_ID,
                config.GOOGLE_CLIENT_SECRET,
                `${config.BACKEND_URL}/api/v1/app/callback?app=${appKey}`,
            );

            const user = await googleOAuthClient.getToken(qry.code as string);
            console.log("user", user);

            // Save Credentials in DB
        }
    } catch (error) {
        return next(error);
    }
};
