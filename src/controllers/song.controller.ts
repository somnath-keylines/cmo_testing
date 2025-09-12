
import type { Request, Response } from "express";
import  { Cmo } from "../models/cmo.model.js";
import  { Song } from "../models/song.model.js";
import  { ApiError } from "../utils/ApiError.js";
import  { asyncHandler } from "../utils/asyncHandler.js";

export const songAdd = asyncHandler(async (req: Request, res: Response) => {
  
  const { title, genre, singerName, description, owner } = req.body as {
    title?: string;
    genre?: string;
    singerName?: string;
    description?: string;
    owner?: string;
  };

  // Validation
  if ([title, singerName, owner].some((field) => !field || field.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }

     const cmoExists = await Cmo.findById(owner);
     if(!cmoExists){
        throw new ApiError(404, "Cmo not found");
     }

  const result = await Song.create({
    title,
    genre,
    singerName,
    description,
    owner,
  });

  res.status(200).json({
    message: "Song added successfully",
    song: result,
  });
});


export const songFetch = asyncHandler(async (req: Request, res: Response) => {
  const result = await Song.find()
                .populate("owner", "name email phone gstNumber licenseNumber");
  res.status(200).json({
    message: "Song fetched successfully",
    allSongs: result,
  });
});