import mongoose, { Schema, Model } from "mongoose";
import type { CmoDocument } from "../types/cmo.type.js";

const cmoSchema = new Schema<CmoDocument>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: Number, required: true },
    gstNumber: { type: String, required: true },
    licenseNumber: { type: String, required: true },
  },
  { timestamps: true }
);


export const Cmo: Model<CmoDocument> = mongoose.model<CmoDocument>(
  "Cmo",
  cmoSchema
);