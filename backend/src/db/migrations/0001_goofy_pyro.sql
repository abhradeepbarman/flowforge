CREATE TABLE "step_conditions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"step_id" uuid NOT NULL,
	"key" varchar NOT NULL,
	"operator" varchar NOT NULL,
	"value" varchar NOT NULL,
	CONSTRAINT "step_conditions_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE "steps" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"workflow_id" uuid,
	"index" integer DEFAULT 0 NOT NULL,
	"type" varchar NOT NULL,
	"app" varchar NOT NULL,
	"action" jsonb NOT NULL,
	"credentials" jsonb NOT NULL,
	"execution_interval" varchar NOT NULL,
	CONSTRAINT "steps_id_unique" UNIQUE("id")
);
--> statement-breakpoint
ALTER TABLE "step_conditions" ADD CONSTRAINT "step_conditions_step_id_steps_id_fk" FOREIGN KEY ("step_id") REFERENCES "public"."steps"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "steps" ADD CONSTRAINT "steps_workflow_id_workflows_id_fk" FOREIGN KEY ("workflow_id") REFERENCES "public"."workflows"("id") ON DELETE cascade ON UPDATE no action;