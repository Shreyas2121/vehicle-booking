import { z } from "zod";
import dotenv from "dotenv";
dotenv.config();

const envSchema = z.object({
  PORT: z.string().min(4).max(4),
  DB_HOST: z.string(),
  DB_PORT: z.string().min(4).max(4),
  DB_USER: z.string(),
  DB_PASSWORD: z.string(),
  DB_NAME: z.string(),
});

export const env = envSchema.parse(process.env);

export const bookingSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  vehicleId: z.number(),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
});

export const idSchema = z.number().positive();
