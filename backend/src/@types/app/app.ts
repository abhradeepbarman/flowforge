import { NextFunction, Request, Response } from "express";

export interface App {
    key: string;
    name: string;
    login: (
        appKey: string,
        req: Request,
        res: Response,
        next: NextFunction,
    ) => void;
    callback: (
        appKey: string,
        req: Request,
        res: Response,
        next: NextFunction,
    ) => void;
    triggers?: Trigger[];
    actions?: Action[];
}

export interface Trigger {
    key: string;
    name: string;
    description: string;
    executionIntervals: {
        name: string;
        value: number;
    }[];
    run: Function;
}

export interface Action {
    key: string;
    name: string;
    description: string;
    run: Function;
}
