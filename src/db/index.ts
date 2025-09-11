import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async (): Promise<void> => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI is not defined in environment variables");
    }

    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`
    );

    console.log(
      `✅ Database connected successfully to host: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.error("Database connection error:", error);
    process.exit(1); // Exit the process if connection fails
  }
};

export default connectDB;
