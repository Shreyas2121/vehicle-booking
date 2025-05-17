import { z } from "zod";

export const wheelsSchema = z.object({
  wheels: z.string(),
});

export type WheelsSchema = z.infer<typeof wheelsSchema>;
