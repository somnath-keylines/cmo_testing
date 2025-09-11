import mongoose from "mongoose";

// 1. TypeScript interface for the CMO document
export interface ICmo {
  name: string;
  email: string;
  phone: Number;
  gstNumber: string;
  licenseNumber: string;
}

export type CmoDocument = ICmo & mongoose.Document;