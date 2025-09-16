import type { Request, Response } from "express";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import type { AuthenticatedRequest } from "../middlewares/Auth.middlewares.js";

interface RegisterUserBody {
  username: string;
  email: string;
  password: string;
  address: string;
  gstNumber: string;
}

const registerUser = asyncHandler(
  async (req: Request<{}, {}, RegisterUserBody>, res: Response) => {
    const { username, email, password, address, gstNumber } = req.body;

    // ✅ Validate all fields exist and are not empty
    if (
      [username, email, password, address, gstNumber].some(
        (field) => typeof field !== "string" || field.trim() === ""
      )
    ) {
      return res.status(400).json(new ApiError(400, "All fields are required"));
    }

    const existedUser = await User.findOne({
      $or: [{ username }, { email }],
    });

    if (existedUser) {
      return res.status(409).json(new ApiError(409, "User with same email or username already exists"));
    }

    // ✅ Safe hashing
    const hashPass = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password: hashPass,
      address,
      gstNumber,
    });

    const createdUser = await User.findById(user._id).select("-password");
    if (!createdUser) {
      throw new ApiError(500, "Failed to create user");
    }

    return res
      .status(201)
      .json(new ApiResponse(201, createdUser, "User registered successfully"));
  }
);

const loginUser = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const existedUser = (await User.findOne({
    email,
  })) as import("mongoose").Document & {
    _id: any;
    username: string;
    role: string;
    password: string;
  };
  if (!existedUser) {
    return res.status(200).json(new ApiError(200, "Email not found"));
  }

  // ✅ Compare hashed password
  const isPasswordValid = await bcrypt.compare(password, existedUser.password);
  if (!isPasswordValid) {
    return res.status(200).json(new ApiError(200, "Invalid password"));
  }

  // ✅ token payload with id, name, role (flattened)
  const token = jwt.sign(
    {
      id: existedUser._id.toString(),
      name: existedUser.username,
      role: existedUser.role,
    },
    "cmotesting123",
    { expiresIn: "15d" }
  );

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        id: existedUser._id,
        role: existedUser.role,
        token,
      },
      "Login successful"
    )
  );
});

const viewProfile = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user?.id; // ✅ directly from token

    if (!userId) {
      return res.status(200).json(new ApiError(200, "Invalid token: missing user id"));
    }

    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(200).json(new ApiError(200, "User not found"));
    }

    return res
      .status(200)
      .json(new ApiResponse(200, user, "User profile fetched successfully"));
  }
);

export { registerUser, loginUser, viewProfile };
