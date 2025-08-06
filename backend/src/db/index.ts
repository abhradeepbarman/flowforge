import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import config from "../config";
import { users, workflows } from "./schema";
import { userRelations } from "./schema/users";
import { workflowRelations } from "./schema/workflows";

const schema = {
    users,
    workflows,

    userRelations,
    workflowRelations,
};

const client = postgres(config.DB_URL);
export const db = drizzle({ client, schema, logger: true });
