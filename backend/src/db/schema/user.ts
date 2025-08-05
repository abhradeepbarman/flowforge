import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";

const users = pgTable("users", {
    id: uuid("id").primaryKey().unique().notNull().defaultRandom(),
    name: varchar("name").notNull(),
    email: varchar("email").notNull().unique(),
    refreshToken: varchar("refresh_token"),
});

export default users;
