import { and, eq, gte, lte } from "drizzle-orm";
import { db } from "../../db";
import { bookingTable } from "../../db/schema";
import { AppError } from "../../lib/error";

import userService from "../user/user.service";

class BookingService {
  async getExistingBooking(vehicleId: number, startDate: Date, endDate: Date) {
    const overlap = await db
      .select()
      .from(bookingTable)
      .where(
        and(
          eq(bookingTable.vehicleId, vehicleId),
          lte(bookingTable.startDate, endDate),
          gte(bookingTable.endDate, startDate)
        )
      );

    if (overlap.length > 0) {
      throw new AppError("Vehicle is already booked for the given dates", 400);
    }

    return;
  }

  async createBooking(
    bookingData: Omit<typeof bookingTable.$inferInsert, "userId"> & {
      firstName: string;
      lastName: string;
    }
  ) {
    await this.getExistingBooking(
      bookingData.vehicleId,
      bookingData.startDate,
      bookingData.endDate
    );

    return await db.transaction(async (tx) => {
      const user = await userService.createUser(
        {
          firstName: bookingData.firstName,
          lastName: bookingData.lastName,
        },
        tx
      );

      const booking = await tx
        .insert(bookingTable)
        .values({
          endDate: bookingData.endDate,
          startDate: bookingData.startDate,
          userId: user.id,
          vehicleId: bookingData.vehicleId,
        })
        .returning();

      return booking[0];
    });
  }
}

export default new BookingService();
