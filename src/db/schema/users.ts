import { pgTable, varchar, timestamp } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const users = pgTable("users", {
  userId: varchar("user_id", { length: 50 }).primaryKey(), // Firebase UID
  firstName: varchar("first_name", { length: 100 }).notNull(),
  lastName: varchar("last_name", { length: 100 }),
  phoneNumber: varchar("phone_number", { length: 20 }).notNull().unique(),
  email: varchar("email", { length: 255 }).unique(),
  createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`).notNull(),
});
