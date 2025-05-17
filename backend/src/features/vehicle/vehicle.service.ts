import { eq } from "drizzle-orm";
import { db } from "../../db";
import { vehiclesTable, vehicleTypesTable } from "../../db/schema";

class VehicleService {
  async getWheels() {
    return await db
      .selectDistinct({
        wheels: vehicleTypesTable.wheels,
      })
      .from(vehicleTypesTable);
  }

  async getVehiclesTypes(wheels: number) {
    return await db
      .select()
      .from(vehicleTypesTable)
      .where(eq(vehicleTypesTable.wheels, wheels));
  }

  async getVehicleModels(vehicleTypeId: number) {
    return await db
      .select()
      .from(vehiclesTable)
      .where(eq(vehiclesTable.typeId, vehicleTypeId));
  }
}

export default new VehicleService();
