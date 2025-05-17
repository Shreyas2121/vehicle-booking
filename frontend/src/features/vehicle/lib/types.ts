export interface VehicleType {
  id: number;
  name: string;
  wheels: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface VehicleModel {
  id: number;
  name: string;
  typeId: number;
  createdAt: Date;
  updatedAt: Date;
}
