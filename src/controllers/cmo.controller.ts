import type { Request, Response } from "express";
import  { Cmo } from "../models/cmo.model.js";
import  { ApiError } from "../utils/ApiError.js";
import  { asyncHandler } from "../utils/asyncHandler.js";

export const cmoAdd = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, phone, gstNumber, licenseNumber } = req.body as {
    name: string;
    email: string;
    phone: String;
    gstNumber: string;
    licenseNumber: string;
  };

  // Validation
  if ([name, email, gstNumber, licenseNumber ].some((field) => !field || field.trim() === "" || !phone)) {
         throw new ApiError(400, "All fields are required");
      }


  const result = await Cmo.create({
    name,
    email,
    phone,
    gstNumber,
    licenseNumber,
  });

  res.status(200).json({
    message: "Cmo added successfully",
    cmo: result,
  });
});

export const cmoFetch = asyncHandler(async (req: Request, res: Response) => {
  const result = await Cmo.find();
  res.status(200).json({
    message: "Cmo fetched successfully",
    allCmos: result,
  });
});

