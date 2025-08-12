import { NextFunction, Request, Response } from "express";
import { apps } from "../apps";
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

    async appLogin(req: Request, res: Response, next: NextFunction) {
        try {
            const { app } = req.params;

            // check if app exists
            const appExists = apps.find((a) => a.key === app);
            if (!appExists) {
                return next(CustomErrorHandler.notFound("App not found"));
            }

            if (!appExists.login) {
                return next(CustomErrorHandler.notFound("App has no login"));
            }

            return appExists.login(app, req, res, next);
        } catch (error) {
            console.log(error);
            return next(error);
        }
    },

    async appCallback(req: Request, res: Response, next: NextFunction) {
        try {
            const { app } = req.query;
            const appName = app as string;

            if (!app)
                return next(CustomErrorHandler.BadRequest("Invalid request"));

            // check if app exists
            const appExists = apps.find((a) => a.key === app);
            if (!appExists) {
                return next(CustomErrorHandler.notFound("App not found"));
            }

            if (!appExists.callback) {
                return next(CustomErrorHandler.notFound("App has no callback"));
            }

            return appExists.callback(appName, req, res, next);
        } catch (error) {
            return next(error);
        }
    },

    async getAllEvents(req: Request, res: Response, next: NextFunction) {
        const { app } = req.params;
        const { isTrigger = true } = req.query;

        const appExists = apps.find((a) => a.key === app);
        if (!appExists) {
            return next(CustomErrorHandler.notFound("App not found"));
        }

        if (isTrigger) {
            const isTriggerPresent = appExists.triggers
                ? appExists.triggers.length > 0
                : false;
            if (!isTriggerPresent) {
                return next(CustomErrorHandler.notFound("App has no triggers"));
            }

            return res
                .status(200)
                .send(
                    ResponseHandler(200, "Triggers found", appExists.triggers),
                );
        } else {
            const isActionPresent = appExists.actions
                ? appExists.actions.length > 0
                : false;
            if (!isActionPresent) {
                return next(CustomErrorHandler.notFound("App has no actions"));
            }

            return res
                .status(200)
                .send(ResponseHandler(200, "Actions found", appExists.actions));
        }
    },
};
