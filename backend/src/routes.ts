import { Router } from "express";
import { vehicleRoutes } from "./features/vehicle/vehicle.routes";
import { bookingRoutes } from "./features/booking/booking.routes";

export const mainRoutes = Router();

mainRoutes.use("/vehicle", vehicleRoutes);
mainRoutes.use("/booking", bookingRoutes);
