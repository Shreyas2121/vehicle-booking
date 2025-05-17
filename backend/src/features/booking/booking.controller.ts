import { asyncHandler, handleValidationError } from "../../lib/error";
import { bookingSchema } from "../../lib/zodSchema";

import bookingService from "./booking.service";

export const createBooking = asyncHandler(async (req, res) => {
  const data = req.body;

  const zodRes = bookingSchema.safeParse(data);

  if (!zodRes.success) {
    return handleValidationError(zodRes.error, res);
  }

  const parsedData = zodRes.data;

  const booking = await bookingService.createBooking({
    vehicleId: parsedData.vehicleId,
    startDate: parsedData.startDate,
    endDate: parsedData.endDate,
    firstName: parsedData.firstName,
    lastName: parsedData.lastName,
  });

  return res.json({
    message: "Booking created successfully",
    data: booking,
  });
});
