CREATE TYPE "public"."address_type" AS ENUM('Home', 'Work', 'Other');--> statement-breakpoint
CREATE TYPE "public"."order_status" AS ENUM('Placed', 'Confirmed', 'Processing', 'Picked', 'In-transit', 'Delivered', 'Cancelled', 'Returned');--> statement-breakpoint
CREATE TYPE "public"."payment_method" AS ENUM('Credit Card', 'Debit Card', 'UPI', 'Net Banking', 'Cash on Delivery');--> statement-breakpoint
CREATE TYPE "public"."payment_status" AS ENUM('Pending', 'Successful', 'Failed', 'Refunded');--> statement-breakpoint
CREATE TABLE "addresses" (
	"address_id" serial PRIMARY KEY NOT NULL,
	"user_id" varchar(100) NOT NULL,
	"full_name" varchar(255) NOT NULL,
	"phone_number" varchar(20) NOT NULL,
	"address_line1" varchar(255) NOT NULL,
	"address_line2" varchar(255),
	"city" varchar(100) NOT NULL,
	"state" varchar(100) NOT NULL,
	"country" varchar(100) DEFAULT 'India' NOT NULL,
	"zip_code" varchar(20) NOT NULL,
	"address_type" "address_type" NOT NULL,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE "cart" (
	"cart_id" serial PRIMARY KEY NOT NULL,
	"user_id" varchar(50) NOT NULL,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	CONSTRAINT "cart_user_id_unique" UNIQUE("user_id")
);
--> statement-breakpoint
CREATE TABLE "cart_items" (
	"cart_item_id" serial PRIMARY KEY NOT NULL,
	"cart_id" integer NOT NULL,
	"product_id" integer NOT NULL,
	"quantity" integer DEFAULT 1 NOT NULL,
	"price_per_unit" numeric(10, 2) NOT NULL,
	"total_price" numeric(10, 2) NOT NULL,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE "orders" (
	"order_id" serial PRIMARY KEY NOT NULL,
	"user_id" varchar(50) NOT NULL,
	"address_id" integer NOT NULL,
	"total_amount" numeric(10, 2) NOT NULL,
	"payment_status" "payment_status" DEFAULT 'Pending' NOT NULL,
	"order_status" "order_status" DEFAULT 'Processing' NOT NULL,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE "payments" (
	"payment_id" serial PRIMARY KEY NOT NULL,
	"user_id" varchar(50) NOT NULL,
	"order_id" integer NOT NULL,
	"payment_method" "payment_method" NOT NULL,
	"payment_amount" numeric(10, 2) NOT NULL,
	"payment_status" "payment_status" DEFAULT 'Pending' NOT NULL,
	"payment_date" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"user_id" varchar(50) PRIMARY KEY NOT NULL,
	"first_name" varchar(100) NOT NULL,
	"last_name" varchar(100) NOT NULL,
	"phone_number" varchar(20) NOT NULL,
	"email" varchar(255),
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	CONSTRAINT "users_phone_number_unique" UNIQUE("phone_number"),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "addresses" ADD CONSTRAINT "addresses_user_id_users_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("user_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "cart" ADD CONSTRAINT "cart_user_id_users_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("user_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "cart_items" ADD CONSTRAINT "cart_items_cart_id_cart_cart_id_fk" FOREIGN KEY ("cart_id") REFERENCES "public"."cart"("cart_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "orders" ADD CONSTRAINT "orders_user_id_users_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("user_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "orders" ADD CONSTRAINT "orders_address_id_addresses_address_id_fk" FOREIGN KEY ("address_id") REFERENCES "public"."addresses"("address_id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payments" ADD CONSTRAINT "payments_user_id_users_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("user_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payments" ADD CONSTRAINT "payments_order_id_orders_order_id_fk" FOREIGN KEY ("order_id") REFERENCES "public"."orders"("order_id") ON DELETE cascade ON UPDATE no action;