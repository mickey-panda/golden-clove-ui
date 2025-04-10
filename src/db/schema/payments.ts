import { pgTable, serial, varchar, timestamp, integer, numeric } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import { users } from "./users";
import { orders } from "./orders";
import { PaymentStatusEnum, PaymentMethodEnum } from "./enums";

export const payments = pgTable("payments", {
  paymentId: serial("payment_id").primaryKey(),
  userId: varchar("user_id", { length: 50 }).notNull().references(() => users.userId, { onDelete: "cascade" }),
  orderId: integer("order_id").notNull().references(() => orders.orderId, { onDelete: "cascade" }),
  paymentMethod: PaymentMethodEnum("payment_method").notNull(),
  paymentAmount: numeric("payment_amount", { precision: 10, scale: 2 }).notNull(),
  paymentStatus: PaymentStatusEnum("payment_status").default("Pending").notNull(),
  paymentDate: timestamp("payment_date").default(sql`CURRENT_TIMESTAMP`).notNull(),
});
