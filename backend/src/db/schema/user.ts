import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";

const users = pgTable("user", {
    id: uuid("id").primaryKey().unique().notNull().defaultRandom(),
    name: varchar("name").notNull(),
    email: varchar("email").notNull().unique(),
    password: varchar("password"),
});

export default users;
