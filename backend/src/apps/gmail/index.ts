import { NextFunction, Request, Response } from "express";
import { App } from "../../@types/app/app";
import triggers from "./triggers";
import { login } from "./auth/login";
import { callback } from "./auth/callback";

const gmailApp: App = {
    key: "GMAIL",
    name: "Gmail",
    triggers,
    login: (appKey: string, req: Request, res: Response, next: NextFunction) =>
        login(appKey, req, res, next),
    callback: (
        appKey: string,
        req: Request,
        res: Response,
        next: NextFunction,
    ) => callback(appKey, req, res, next),
};

export default gmailApp;
