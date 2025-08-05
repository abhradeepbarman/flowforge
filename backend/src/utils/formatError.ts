import { ZodError } from "zod";

export const formatError = (error: ZodError): any => {
    let errors: any = {};
    error.issues.forEach((issue) => {
        errors[issue.path[0]] = issue.message;
    });

    return errors;
};
