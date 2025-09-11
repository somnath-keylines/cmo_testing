import mongoose from "mongoose";

// Interface for Song fields
export interface ISong {
  title: string;
  genre?: string;
  singerName: string;
  description?: string;
  owner: mongoose.Types.ObjectId;
}

// Full Song document type (extends Mongoose Document)
export type SongDocument = ISong & mongoose.Document;