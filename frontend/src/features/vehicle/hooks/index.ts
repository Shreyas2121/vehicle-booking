import { useCreateQuery } from "../../../hooks/useApi";
import type { VehicleModel, VehicleType } from "../lib/types";

export const useGetWheels = () => {
  return useCreateQuery<{
    data: {
      wheels: number;
    }[];
  }>(["vehicle/wheels"], "/vehicle/wheels");
};

export const useGetVehicleTypesByWheels = (wheels: number | null) => {
  return useCreateQuery<VehicleType[]>(
    ["vehicle/types", wheels],
    "/vehicle/types",
    "data",
    {
      wheels,
    },
    {
      enabled: !!wheels,
    }
  );
};

export const useGetVehicleModelsByType = (vehicleTypeId: number | null) => {
  return useCreateQuery<VehicleModel[]>(
    ["vehicle/models", vehicleTypeId],
    "/vehicle/models",
    "data",
    {
      vehicleTypeId,
    },
    {
      enabled: !!vehicleTypeId,
    }
  );
};
