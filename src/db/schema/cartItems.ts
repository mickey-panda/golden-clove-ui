import { pgTable, serial, integer, timestamp, numeric } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import { cart } from "./cart";

export const cartItems = pgTable("cart_items", {
  cartItemId: serial("cart_item_id").primaryKey(),
  cartId: integer("cart_id").notNull().references(() => cart.cartId, { onDelete: "cascade" }),
  productId: integer("product_id").notNull(),
  quantity: integer("quantity").notNull().default(1),
  pricePerUnit: numeric("price_per_unit", { precision: 10, scale: 2 }).notNull(),
  totalPrice: numeric("total_price", { precision: 10, scale: 2 }).notNull(),
  createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`).notNull(),
});
