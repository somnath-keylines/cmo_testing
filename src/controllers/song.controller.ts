
import type { Request, Response } from "express";
import  { Cmo } from "../models/cmo.model.js";
import  { Song } from "../models/song.model.js";
import  { ApiError } from "../utils/ApiError.js";
import  { asyncHandler } from "../utils/asyncHandler.js";
import type { AuthenticatedRequest } from "../middlewares/Auth.middlewares.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const songAdd = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {

    const userId = req.user?.id;   // ✅ directly from token

  if (!userId) {
    return res.status(200).json(new ApiError(200, "Invalid token: missing user id"));
  }

  const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(200).json(new ApiError(200, "User not found"));
    }
        if (user.role !== "admin")  {
      return res.status(400).json(new ApiError(400, "Only admin can add song"));
      }
    try {
      const { title, genre, singerName, description, owner } = req.body as {
        title?: string;
        genre?: string;
        singerName?: string;
        description?: string;
        owner?: string;
      };
  

      // Validation
      if ([title, singerName, owner].some((field) => !field || field.trim() === "")) {
        return res.status(400).json(new ApiError(400, "all fields are required"));
      }

        const cmoExists = await Cmo.findById(owner);
        if(!cmoExists){
            return res.status(404).json(new ApiError(404, "com not found"));
        }

      const result = await Song.create({
        title,
        genre,
        singerName,
        description,
        owner,
      });

       return res.status(200).json(new ApiResponse(200, result, "Song added successfully"));

    } catch (error) {
      throw new ApiError(400, "Invalid request body");
    }
});


export const songFetch = asyncHandler(async (req: Request, res: Response) => {
  const result = await Song.find()
                .populate("owner", "name email phone gstNumber licenseNumber");
      return res
      .status(200)
      .json(new ApiResponse(200, result, "Song fetched successfully"));
});
