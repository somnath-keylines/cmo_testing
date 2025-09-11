import mongoose, { Schema, Model } from "mongoose";
import type { SongDocument } from "../types/song.type.js";

// Define the schema
const songSchema = new Schema<SongDocument>(
  {
    title: { type: String, required: true },
    genre: { type: String },
    singerName: { type: String, required: true },
    description: { type: String },
    owner: { type: Schema.Types.ObjectId, ref: "Cmo", required: true },
  },
  { timestamps: true }
);

// Export the model
export const Song: Model<SongDocument> = mongoose.model<SongDocument>(
  "Song",
  songSchema
);