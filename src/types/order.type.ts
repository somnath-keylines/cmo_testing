import type { Document, Types } from "mongoose";

export interface IOrder {
  userId: Types.ObjectId;
  songId: Types.ObjectId;
  celebrity: boolean;
  guest: "1-50" | "51-100" | "101-200" | "201-300" | "301-400" | "401-500" | "501-600" | "601-700" | "701-800" | "801-900" | "901-1000";
  price: number;
  status: "pending" | "confirmed" | "completed" | "cancelled";
}

export type OrderDocument = IOrder & Document;
