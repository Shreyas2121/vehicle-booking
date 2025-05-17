import { z } from "zod";

export const bookingSchema = z.object({
  dateRange: z
    .object({
      from: z.date().optional(),
      to: z.date().optional(),
    })
    .refine(
      (range) => range.from && range.to && range.to > range.from,
      "Please select a valid date range"
    ),
});

export type BookingFormData = z.infer<typeof bookingSchema>;
