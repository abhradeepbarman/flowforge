import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import config from "../config";
import { stepConditions, steps, users, workflows } from "./schema";
import { userRelations } from "./schema/users";
import { workflowRelations } from "./schema/workflows";
import { stepRelations } from "./schema/steps";
import { stepConditionRelations } from "./schema/stepConditions";

const schema = {
    users,
    workflows,
    steps,
    stepConditions,

    userRelations,
    workflowRelations,
    stepRelations,
    stepConditionRelations,
};

const client = postgres(config.DB_URL);
export const db = drizzle({ client, schema, logger: true });
