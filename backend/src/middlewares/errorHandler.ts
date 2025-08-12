import { ErrorRequestHandler, Response } from "express";
import { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";
import { ZodError } from "zod";
import CustomErrorHandler from "../utils/CustomErrorHandler";
import { formatError } from "../utils/formatError";
import ResponseHandler from "../utils/ResponseHandler";

const errorHandler: ErrorRequestHandler = (
    err: Error,
    _,
    res: Response,
): void => {
    let statusCode = 500;
    let errData = {
        message: "Internal Server Error",
    };

    if (err instanceof JsonWebTokenError) {
        statusCode = 401;
        errData = {
            message: "Unauthorized",
        };
    }

    if (err instanceof TokenExpiredError) {
        statusCode = 401;
        errData = {
            message: "Unauthorized",
        };
    }

    if (err instanceof ZodError) {
        statusCode = 422;
        errData = {
            message: formatError(err),
        };
    }

    if (err instanceof CustomErrorHandler) {
        statusCode = err.status;
        errData = err.toJson();
    }

    res.status(statusCode).send(ResponseHandler(statusCode, errData.message));
};

export default errorHandler;
