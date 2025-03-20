import { pgTable, serial, text, jsonb} from "drizzle-orm/pg-core";

export const products = pgTable("products", {
  productId: serial("product_id").primaryKey(),
  name: text("name").notNull(),
  image: text("image").notNull(),
  sizes: jsonb("sizes").notNull(), // Stores size & price as JSON
  categories: jsonb("categories").notNull(), // Stores categories as JSON array
});
