import { relations } from "drizzle-orm";
import { integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";

const id = integer().primaryKey().generatedAlwaysAsIdentity();
const createdAt = timestamp("created_at", { withTimezone: true })
  .defaultNow()
  .notNull();
const updatedAt = timestamp("updated_at", { withTimezone: true })
  .defaultNow()
  .notNull()
  .$onUpdateFn(() => new Date());

export const usersTable = pgTable("users", {
  id,
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  createdAt,
  updatedAt,
});

export const usersRelations = relations(usersTable, ({ many }) => ({
  bookings: many(bookingTable),
}));

export const vehicleTypesTable = pgTable("vehicle_types", {
  id,
  name: text("name").notNull(),
  wheels: integer("wheels").notNull(),
  createdAt,
  updatedAt,
});

export const vehicleTypesRelations = relations(
  vehicleTypesTable,
  ({ many }) => ({
    vehicles: many(vehiclesTable),
  })
);

export const vehiclesTable = pgTable("vehicles", {
  id,
  name: text("name").notNull(),
  typeId: integer("type_id")
    .notNull()
    .references(() => vehicleTypesTable.id, { onDelete: "cascade" }),
  createdAt,
  updatedAt,
});

export const vehiclesRelations = relations(vehiclesTable, ({ one, many }) => ({
  type: one(vehicleTypesTable, {
    fields: [vehiclesTable.typeId],
    references: [vehicleTypesTable.id],
  }),
  bookings: many(bookingTable),
}));

export const bookingTable = pgTable("bookings", {
  id,
  userId: integer("user_id")
    .notNull()
    .references(() => usersTable.id),
  vehicleId: integer("vehicle_id")
    .notNull()
    .references(() => vehiclesTable.id),
  startDate: timestamp("start_date", { withTimezone: true }).notNull(),
  endDate: timestamp("end_date", { withTimezone: true }).notNull(),
  createdAt,
  updatedAt,
});

export const bookingRelations = relations(bookingTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [bookingTable.userId],
    references: [usersTable.id],
  }),
  vehicle: one(vehiclesTable, {
    fields: [bookingTable.vehicleId],
    references: [vehiclesTable.id],
  }),
}));
