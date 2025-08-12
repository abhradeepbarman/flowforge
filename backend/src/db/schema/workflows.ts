import { relations } from "drizzle-orm";
import { pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import steps from "./steps";
import users from "./users";
import { workflowStatus } from "@/constants";

const workflows = pgTable("workflows", {
    id: uuid("id").primaryKey().unique().notNull().defaultRandom(),
    name: varchar("name").notNull().default("New Workflow"),
    userId: uuid("user_id")
        .references(() => users.id, {
            onDelete: "cascade",
            onUpdate: "no action",
        })
        .notNull(),
    status: varchar("status", {
        enum: [
            workflowStatus.ACTIVE,
            workflowStatus.INACTIVE,
            workflowStatus.INCOMPLETE,
        ],
    }).notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const workflowRelations = relations(workflows, ({ one, many }) => ({
    user: one(users, {
        fields: [workflows.userId],
        references: [users.id],
    }),
    steps: many(steps),
}));

export default workflows;
