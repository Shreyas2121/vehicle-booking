import { Router } from "express";
import { createBooking } from "./booking.controller";

export const bookingRoutes = Router();

bookingRoutes.post("/", createBooking);
