import type { Response } from "express";
import { Order } from "../models/order.model.js";
import { User } from "../models/user.model.js";
import { Song } from "../models/song.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import type { AuthenticatedRequest } from "../middlewares/Auth.middlewares.js";

export const placeOrder = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user?.id; // ✅ from JWT

    if (!userId) {
      throw new ApiError(401, "Unauthorized: User not logged in");
    }

    const { songId, celebrity = false , guest = "1-50", price } = req.body;

    if (!songId || !price ||  celebrity === undefined  || !guest) {
      throw new ApiError(400, "All fields are required");
    }

    // ✅ Check if song exists
    const song = await Song.findById(songId);
    if (!song) {
      throw new ApiError(404, "Song not found");
    }

    // ✅ Create new order
    const order = await Order.create({
      userId,
      songId,
      celebrity,
      guest,
      price,
      status: "pending",
    });

    // ✅ Add order reference to user
    await User.findByIdAndUpdate(userId, {
      $push: { orders: order._id },
    });

    return res
      .status(201)
      .json(new ApiResponse(201, order, "Order placed successfully"));
  }
);

export const getOrderHistory = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user?.id;

    if (!userId) {
      throw new ApiError(401, "Unauthorized: No user found in request");
    }

    const orders = await Order.find({ userId })
      .populate({
        path: "songId",
        populate: { path: "owner", model: "Cmo" }, // ✅ only owner, no moderId
      })
      .populate("userId", "username email") // only include these fields
      .exec(); // latest orders first

    return res
      .status(200)
      .json(new ApiResponse(200, orders, "Order history fetched successfully"));
  }
);

// Get All Orders (Admin only)
export const getAllOrders = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const userRole = req.user?.role;

    if (!userRole) {
      throw new ApiError(401, "Please login to access this resource");
    }

    if (userRole !== "admin") {
      throw new ApiError(403, "Access denied. Admins only.");
    }

    const orders = await Order.find()
      .populate({
        path: "songId",
        populate: { path: "owner", model: "Cmo" }, // expand owner
      })
      .populate("userId", "username email address") // expand user info
      .exec();

    return res
      .status(200)
      .json(new ApiResponse(200, orders, "All orders fetched successfully"));
  }
);

export const updateOrderStatus = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const userRole = req.user?.role;

    if (!userRole) {
      throw new ApiError(401, "Please login to access this resource");
    }

    if (userRole !== "admin") {
      throw new ApiError(403, "Access denied. Admins only.");
    }

    const { orderId } = req.params;
    const { status } = req.body;

    // ✅ validate status input
    const allowedStatuses = ["pending", "approved", "rejected", "completed"];
    if (!allowedStatuses.includes(status)) {
      throw new ApiError(
        400,
        `Invalid status. Allowed values: ${allowedStatuses.join(", ")}`
      );
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    )
      .populate({
        path: "songId",
        populate: { path: "owner", model: "Cmo" },
      })
      .populate("userId", "username email")
      .exec();

    if (!updatedOrder) {
      throw new ApiError(404, "Order not found");
    }

    return res.status(200).json(
      new ApiResponse(200, updatedOrder, "Order status updated successfully")
    );
  }
);
