import { pgEnum } from "drizzle-orm/pg-core";

export const PaymentStatusEnum = pgEnum("payment_status", ["Pending", "Successful", "Failed", "Refunded"]);
export const OrderStatusEnum = pgEnum("order_status", ["Placed","Confirmed","Processing","Picked", "In-transit", "Delivered", "Cancelled", "Returned"]);
export const AddressTypeEnum = pgEnum("address_type", ["Home", "Work", "Other"]);
export const PaymentMethodEnum = pgEnum("payment_method", ["Credit Card", "Debit Card", "UPI", "Net Banking", "Cash on Delivery"]);
