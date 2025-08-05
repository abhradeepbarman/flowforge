ALTER TABLE "user" RENAME TO "users";--> statement-breakpoint
ALTER TABLE "users" RENAME COLUMN "password" TO "refresh_token";--> statement-breakpoint
ALTER TABLE "users" DROP CONSTRAINT "user_id_unique";--> statement-breakpoint
ALTER TABLE "users" DROP CONSTRAINT "user_email_unique";--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_id_unique" UNIQUE("id");--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_email_unique" UNIQUE("email");