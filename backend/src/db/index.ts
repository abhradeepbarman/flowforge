import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import config from "../config";
import { users } from "./schema";

const schema = {
    users,
};

const client = postgres(config.DB_URL);
export const db = drizzle({ client, schema, logger: true });
