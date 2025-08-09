import { Trigger } from "../../../@types/apps/app";
import { executionIntervals } from "../../../constants";

export const newEmailTrigger: Trigger = {
    key: "NEW_EMAIL",
    name: "New Email",
    description: "Triggered when a new email is received",
    executionIntervals,
};
