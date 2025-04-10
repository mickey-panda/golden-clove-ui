import { defineConfig } from "drizzle-kit";
import {config} from "dotenv";

config({path : ".env.local"});

export default defineConfig({
  schema: "./src/db/schema/**/*",  // Include all schema files
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.NEXT_PUBLIC_DATABASE_URL as string,
  },
});
