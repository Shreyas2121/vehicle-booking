import { z } from "zod";

export const vehicleTypeSchema = z.object({
  vehicleType: z.string(),
});

export type VehcileTypeSchema = z.infer<typeof vehicleTypeSchema>;
