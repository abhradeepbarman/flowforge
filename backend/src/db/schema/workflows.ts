import { relations } from "drizzle-orm";
import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";
import steps from "./steps";
import users from "./users";

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

export const workflowRelations = relations(workflows, ({ one, many }) => ({
    user: one(users, {
        fields: [workflows.userId],
        references: [users.id],
    }),
    steps: many(steps),
}));

export default workflows;
