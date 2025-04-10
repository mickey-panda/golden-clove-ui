import { pgTable, serial, varchar, timestamp } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import { users } from "./users";
import { AddressTypeEnum } from "./enums";

export const addresses = pgTable("addresses", {
  addressId: serial("address_id").primaryKey(),
  userId: varchar("user_id", { length: 100 }).notNull().references(() => users.userId, { onDelete: "cascade" }),
  fullName: varchar("full_name", { length: 255 }).notNull(),
  phoneNumber: varchar("phone_number", { length: 20 }).notNull(),
  addressLine1: varchar("address_line1", { length: 255 }).notNull(),
  addressLine2: varchar("address_line2", { length: 255 }),
  city: varchar("city", { length: 100 }).notNull(),
  state: varchar("state", { length: 100 }).notNull(),
  country: varchar("country", { length: 100 }).notNull().default("India"),
  zipCode: varchar("zip_code", { length: 20 }).notNull(),
  addressType: AddressTypeEnum("address_type").notNull(),
  createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`).notNull(),
});
