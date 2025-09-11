import mongoose from "mongoose";

// Interface for User fields
export interface IUser {
  username: string;
  email: string;
  password: string;
  address: string;
  gstNumber:string;
  role?: "user" | "admin";
  orders: mongoose.Types.ObjectId[];
}

// Full User document type (extends Mongoose Document)
export type UserDocument = IUser & mongoose.Document;
