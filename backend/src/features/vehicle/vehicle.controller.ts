import { asyncHandler, handleValidationError } from "../../lib/error";
import { idSchema } from "../../lib/zodSchema";
import vehicleService from "./vehicle.service";

export const getWheelsController = asyncHandler(async (req, res) => {
  const wheels = await vehicleService.getWheels();

  res.json({
    data: wheels,
  });
});

export const getVehicleTypesController = asyncHandler(async (req, res) => {
  const wheels = req.query.wheels as string;

  const { success, data, error } = idSchema.safeParse(parseInt(wheels));

  if (!success) {
    return handleValidationError(error, res);
  }

  const vehicleTypes = await vehicleService.getVehiclesTypes(data);

  res.json({
    data: vehicleTypes,
  });
});

export const getVehicleModelsController = asyncHandler(async (req, res) => {
  const vehicleTypeId = req.query.vehicleTypeId as string;

  const { success, data, error } = idSchema.safeParse(parseInt(vehicleTypeId));

  if (!success) {
    return handleValidationError(error, res);
  }

  const vehicleModels = await vehicleService.getVehicleModels(data);

  res.json({
    data: vehicleModels,
  });
});
