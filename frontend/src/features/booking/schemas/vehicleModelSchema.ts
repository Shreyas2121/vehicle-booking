import { z } from "zod";

export const vehicleModelSchema = z.object({
  vehicleModel: z.string(),
});

export type VehcileModelSchema = z.infer<typeof vehicleModelSchema>;
