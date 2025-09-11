import mongoose, { Schema, Model } from "mongoose";
import type { UserDocument } from "../types/user.type.js";

// Define the schema
const userSchema = new Schema<UserDocument>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    gstNumber: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      default: "user",
      enum: ["user", "admin"],
    },
    orders: [
      {
        type: Schema.Types.ObjectId,
        ref: "Order",
      },
    ],
  },
  { timestamps: true }
);

// Export the model
export const User: Model<UserDocument> = mongoose.model<UserDocument>(
  "User",
  userSchema
);
