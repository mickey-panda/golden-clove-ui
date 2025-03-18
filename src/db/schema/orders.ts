import { pgTable, serial, varchar, timestamp, integer, numeric } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import { users } from "./users";
import { addresses } from "./addresses";
import { PaymentStatusEnum, OrderStatusEnum } from "./enums";

export const orders = pgTable("orders", {
  orderId: serial("order_id").primaryKey(),
  userId: varchar("user_id", { length: 50 }).notNull().references(() => users.userId, { onDelete: "cascade" }),
  addressId: integer("address_id").notNull().references(() => addresses.addressId, { onDelete: "set null" }),
  totalAmount: numeric("total_amount", { precision: 10, scale: 2 }).notNull(),
  paymentStatus: PaymentStatusEnum("payment_status").default("Pending").notNull(),
  orderStatus: OrderStatusEnum("order_status").default("Processing").notNull(),
  createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`).notNull(),
});
