import { relations } from "drizzle-orm";
import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";
import steps from "./steps";

const stepConditions = pgTable("step_conditions", {
    id: uuid("id").primaryKey().unique().notNull().defaultRandom(),
    stepId: uuid("step_id")
        .notNull()
        .references(() => steps.id, {
            onDelete: "cascade",
            onUpdate: "no action",
        }),
    key: varchar("key").notNull(),
    operator: varchar("operator", {
        enum: ["EQUALS", "CONTAINS"],
    }).notNull(),
    value: varchar("value").notNull(),
});

export const stepConditionRelations = relations(stepConditions, ({ one }) => ({
    step: one(steps, {
        fields: [stepConditions.stepId],
        references: [steps.id],
    }),
}));

export default stepConditions;
