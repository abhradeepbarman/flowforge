import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";
import users from "./users";
import { relations } from "drizzle-orm";

const workflows = pgTable("workflows", {
    id: uuid("id").primaryKey().unique().notNull().defaultRandom(),
    name: varchar("name").notNull().default("New Workflow"),
    userId: uuid("user_id")
        .references(() => users.id, {
            onDelete: "cascade",
            onUpdate: "no action",
        })
        .notNull(),
});

export const workflowRelations = relations(workflows, ({ one }) => ({
    user: one(users, {
        fields: [workflows.userId],
        references: [users.id],
    }),
}));

export default workflows;
