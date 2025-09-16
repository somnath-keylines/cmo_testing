import mongoose, { Schema, Model } from "mongoose";
import type { SongDocument } from "../types/song.type.js";

// Define the schema
const songSchema = new Schema<SongDocument>(
  {
    title: { type: String, required: true },
    genre: { type: String },
    singerName: { type: String, required: true },
    description: { type: String },
    defaultImage: {type: String, default: "https://static.vecteezy.com/system/resources/thumbnails/026/433/446/small_2x/abstract-musical-note-symbol-painting-black-background-generative-ai-photo.jpg"}, 
    owner: { type: Schema.Types.ObjectId, ref: "Cmo", required: true },
  },
  { timestamps: true }
);

// Export the model
export const Song: Model<SongDocument> = mongoose.model<SongDocument>(
  "Song",
  songSchema
);