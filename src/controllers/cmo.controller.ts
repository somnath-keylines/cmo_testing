import type { Request, Response } from "express";
import  { Cmo } from "../models/cmo.model.js";
import  { ApiError } from "../utils/ApiError.js";
import  { asyncHandler } from "../utils/asyncHandler.js";
import type { AuthenticatedRequest } from "../middlewares/Auth.middlewares.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const cmoAdd = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {

          const userId = req.user?.id;   // ✅ directly from token

      if (!userId) {
        return res.status(401).json(new ApiError(401, "Invalid token : missing user id"));
      }

      const user = await User.findById(userId).select("-password");
    if (!user) {
     return res.status(404).json(new ApiError(404, "user not found"));
    }
        if (user.role !== "admin")  {
      return res.status(403).json(new ApiError(403, "Access denied Admin only"));
      }
    try {
      const { name, email, phone, gstNumber, licenseNumber } = req.body as {
        name: string;
        email: string;
        phone: String;
        gstNumber: string;
        licenseNumber: string;
      };

      // Validation
      if ([name, email, gstNumber, licenseNumber ].some((field) => !field || field.trim() === "" || !phone)) {
            return res.status(401).json(new ApiError(401, "all fields are required"));
          }


      const result = await Cmo.create({
        name,
        email,
        phone,
        gstNumber,
        licenseNumber,
      });

       return res.status(200).json(new ApiResponse(200, result, "CMO added successfully"));

  } catch (error) {
      throw new ApiError(400, "Invalid request body");
    }
  });



export const cmoFetch = asyncHandler(async (req: Request, res: Response) => {
  const result = await Cmo.find();
    return res.status(200).json(new ApiResponse(200, result, "CMO fetched successfully"));

});
