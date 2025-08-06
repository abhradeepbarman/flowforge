CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar NOT NULL,
	"email" varchar NOT NULL,
	"refresh_token" varchar,
	CONSTRAINT "users_id_unique" UNIQUE("id"),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "workflows" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar DEFAULT 'New Workflow' NOT NULL,
	"user_id" uuid NOT NULL,
	CONSTRAINT "workflows_id_unique" UNIQUE("id")
);
--> statement-breakpoint
ALTER TABLE "workflows" ADD CONSTRAINT "workflows_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;