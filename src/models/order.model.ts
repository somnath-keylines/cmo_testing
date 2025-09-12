import mongoose, { Schema, Model } from "mongoose";
import type { OrderDocument } from "../types/order.type.js";

const orderSchema = new Schema<OrderDocument>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    songId: { type: Schema.Types.ObjectId, ref: "Song", required: true },
    celebrity: { type: Boolean, default: false, required:true },
    guest: {
      type: String,
      default: "1-50",
      enum: [
        "1-50",
        "51-100",
        "101-200",
        "201-300",
        "301-400",
        "401-500",
        "501-600",
        "601-700",
        "701-800",
        "801-900",
        "901-1000",
      ],
      required:true
    },
    price: { type: Number, required: true },
     status: {
      type: String,
      enum: ["pending", "confirmed", "completed", "cancelled"],
      default: "pending"
    }
  },
  { timestamps: true }
);

export const Order: Model<OrderDocument> =mongoose.model<OrderDocument>("Order", orderSchema);
