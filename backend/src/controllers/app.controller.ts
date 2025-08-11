import { NextFunction, Request, Response } from "express";
import { apps } from "../@apps";
import ResponseHandler from "../utils/ResponseHandler";
import CustomErrorHandler from "../utils/CustomErrorHandler";

export const appController = {
    async getAllApps(req: Request, res: Response, next: NextFunction) {
        const { isTriggerPresent, isActionPresent } = req.query;

        let allApps;
        if (!isTriggerPresent && !isActionPresent) {
            allApps = apps.map((app) => ({
                key: app.key,
                name: app.name,
            }));
        } else if (isTriggerPresent) {
            allApps = apps
                .filter((app) => app.triggers)
                .map((app) => ({
                    key: app.key,
                    name: app.name,
                }));
        } else if (isActionPresent) {
            allApps = apps
                .filter((app) => app.actions)
                .map((app) => ({
                    key: app.key,
                    name: app.name,
                }));
        } else {
            return next(CustomErrorHandler.BadRequest("Invalid request"));
        }

        return res.send(ResponseHandler(200, "Apps found", allApps));
    },

    async getAppTriggers(req: Request, res: Response, next: NextFunction) {
        const { app } = req.params;

        // check if app exists
        const appExists = apps.find((a) => a.key === app);
        if (!appExists) {
            return next(CustomErrorHandler.notFound("App not found"));
        }

        // check if app has triggers
        if (!appExists.triggers) {
            return next(CustomErrorHandler.notFound("App has no triggers"));
        }

        // return triggers
        return res
            .status(200)
            .send(ResponseHandler(200, "Triggers found", appExists.triggers));
    },

    async appLogin(req: Request, res: Response, next: NextFunction) {
        try {
            const { app, trigger } = req.params;

            // check if app exists
            const appExists = apps.find((a) => a.key === app);
            if (!appExists) {
                return next(CustomErrorHandler.notFound("App not found"));
            }

            const triggerDetails = appExists.triggers?.find(
                (t) => t.key === trigger
            );

            if (!triggerDetails) {
                return next(CustomErrorHandler.notFound("Trigger not found"));
            }

            if (!triggerDetails.login) {
                return next(
                    CustomErrorHandler.notFound("Trigger has no login")
                );
            }

            return triggerDetails.login(req, res, next);
        } catch (error) {
            return next(error);
        }
    },

    async appCallback(req: Request, res: Response, next: NextFunction) {
        try {
            const { app, trigger } = req.params;

            // check if app exists
            const appExists = apps.find((a) => a.key === app);
            if (!appExists) {
                return next(CustomErrorHandler.notFound("App not found"));
            }

            const triggerDetails = appExists.triggers?.find(
                (t) => t.key === trigger
            );

            if (!triggerDetails) {
                return next(CustomErrorHandler.notFound("Trigger not found"));
            }

            if (!triggerDetails.callback) {
                return next(
                    CustomErrorHandler.notFound("Trigger has no callback")
                );
            }

            return triggerDetails.callback(req, res, next);
        } catch (error) {
            return next(error);
        }
    },
};
