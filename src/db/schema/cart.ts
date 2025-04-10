import { pgTable, serial, varchar, timestamp } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import { users } from "./users";

export const cart = pgTable("cart", {
  cartId: serial("cart_id").primaryKey(),
  userId: varchar("user_id", { length: 50 }).notNull().unique().references(() => users.userId, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`).notNull(),
});
