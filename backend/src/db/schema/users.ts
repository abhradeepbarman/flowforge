import { relations } from "drizzle-orm";
import { pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import workflows from "./workflows";

const users = pgTable("users", {
    id: uuid("id").primaryKey().unique().notNull().defaultRandom(),
    name: varchar("name").notNull(),
    email: varchar("email").notNull().unique(),
    refreshToken: varchar("refresh_token"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const userRelations = relations(workflows, ({ many }) => ({
    workflows: many(workflows),
}));

export default users;
