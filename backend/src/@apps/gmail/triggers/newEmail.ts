import { Trigger } from "../../../@types/apps/app";
import { newEmailCallback, newEmailLogin } from "./auth/newEmailAuth";

export const newEmailTrigger: Trigger = {
    key: "NEW_EMAIL",
    name: "New Email",
    description: "Triggered when a new email is received",
    executionInterval: {
        name: "Every 5 minutes",
        value: 5 * 60 * 1000,
    },
    login: newEmailLogin,
    callback: newEmailCallback,
};
