import { Router } from "express";
import {
  getWheelsController,
  getVehicleModelsController,
  getVehicleTypesController,
} from "./vehicle.controller";

export const vehicleRoutes = Router();

vehicleRoutes.get("/wheels", getWheelsController);
vehicleRoutes.get("/types", getVehicleTypesController);

vehicleRoutes.get("/models", getVehicleModelsController);
