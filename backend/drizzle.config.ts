import { defineConfig } from "drizzle-kit";
import { URL } from "./src/lib/constants";

export default defineConfig({
  out: "./drizzle",
  schema: "./src/db/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: URL,
  },
});
