import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import config from "../config";
import CustomErrorHandler from "../utils/CustomErrorHandler";
import { User } from "../@types/auth/User";

export const auth = (req: Request, res: Response, next: NextFunction) => {
    const token =
        req.headers.authorization?.split(" ")[1] || req.cookies.access_token;
    console.log(token);
    if (!token) return res.sendStatus(401);

    const user = jwt.verify(token, config.JWT_SECRET);
    if (!user) {
        return next(CustomErrorHandler.unAuthorized("Invalid token"));
    }

    req.user = user as User;
    next();
};
