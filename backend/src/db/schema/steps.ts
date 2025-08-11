import { relations } from "drizzle-orm";
import { integer, jsonb, pgTable, uuid, varchar } from "drizzle-orm/pg-core";
import { stepType } from "../../constants";
import workflows from "./workflows";

const steps = pgTable("steps", {
    id: uuid("id").primaryKey().unique().notNull().defaultRandom(),
    workflowId: uuid("workflow_id").references(() => workflows.id, {
        onDelete: "cascade",
        onUpdate: "no action",
    }),
    name: varchar("name").notNull(),
    index: integer("index").notNull().default(0),
    type: varchar("type", {
        enum: [stepType.ACTION, stepType.TRIGGER],
    }).notNull(),
    app: varchar("app").notNull(),
    action: jsonb("action").notNull(),
    credentials: jsonb("credentials").notNull(),
    executionInterval: varchar("execution_interval").notNull(),
});

export const stepRelations = relations(steps, ({ one }) => ({
    workflow: one(workflows, {
        fields: [steps.workflowId],
        references: [workflows.id],
    }),
    stepCondition: one(steps, {
        fields: [steps.id],
        references: [steps.id],
    }),
}));

export default steps;
