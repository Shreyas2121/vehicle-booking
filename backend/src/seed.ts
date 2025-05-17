import { db } from "./db";
import { vehiclesTable, vehicleTypesTable } from "./db/schema";

async function seed() {
  console.log("🌱 Seeding started...");

  await db.delete(vehicleTypesTable);
  await db.delete(vehiclesTable);

  const types = [
    { name: "Hatchback", wheels: 4 },
    { name: "SUV", wheels: 4 },
    { name: "Sedan", wheels: 4 },
    { name: "Cruiser", wheels: 2 },
  ];

  const insertedTypes = await db
    .insert(vehicleTypesTable)
    .values(types)
    .returning();

  const getTypeId = (name: string) => {
    return insertedTypes.find((type) => type.name === name)?.id ?? 0;
  };

  const vehicles = [
    { name: "Hyundai i20", typeId: getTypeId("Hatchback") },
    { name: "Maruti Swift", typeId: getTypeId("Hatchback") },

    { name: "Tata Nexon", typeId: getTypeId("SUV") },
    { name: "Mahindra XUV700", typeId: getTypeId("SUV") },

    { name: "Honda City", typeId: getTypeId("Sedan") },
    { name: "Skoda Slavia", typeId: getTypeId("Sedan") },

    { name: "Royal Enfield Meteor", typeId: getTypeId("Cruiser") },
    { name: "Jawa 42", typeId: getTypeId("Cruiser") },
  ];

  await db.insert(vehiclesTable).values(vehicles);

  console.log("🌱 Seeding finished...");
}

seed().catch((e) => {
  console.error(e);
  process.exit(1);
});
