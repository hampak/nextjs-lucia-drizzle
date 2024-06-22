ALTER TABLE "admin" RENAME TO "users";--> statement-breakpoint
ALTER TABLE "session" DROP CONSTRAINT "session_user_id_admin_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "session" ADD CONSTRAINT "session_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
