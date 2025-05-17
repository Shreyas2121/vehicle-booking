import { z } from "zod";
import dotenv from "dotenv";
dotenv.config();

const envSchema = z.object({
  PORT: z.string().min(4).max(4),
});

export const env = envSchema.parse(process.env);
