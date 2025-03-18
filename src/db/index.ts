import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as usersSchema from "./schema/users";
import * as ordersSchema from "./schema/orders";
import * as addressesSchema from "./schema/addresses";
import * as cartSchema from "./schema/cart";
import * as cartItemsSchema from "./schema/cartItems";
import * as paymentsSchema from "./schema/payments";
import {config} from "dotenv";

config({path : ".env.local"});


const sql = neon(process.env.NEXT_PUBLIC_DATABASE_URL!);

export const db = drizzle(sql, {
  schema: { ...usersSchema, ...ordersSchema, ...addressesSchema, ...cartItemsSchema, ...cartSchema, ...paymentsSchema },
});
