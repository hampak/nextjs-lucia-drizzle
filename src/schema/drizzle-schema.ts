import { pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const userTable = pgTable("admin", {
  id: text("id").primaryKey().notNull(),
  username: text("user_name").notNull(),
  hashedPassword: text("hashed_password").notNull(),
  salt: text("salt").notNull()
})

export const sessionTable = pgTable("session", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => userTable.id),
  expiresAt: timestamp("expires_at", {
    withTimezone: true,
    mode: "date"
  }).notNull()
});