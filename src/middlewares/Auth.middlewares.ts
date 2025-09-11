import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// Extend Express Request to include `user`
export interface AuthenticatedRequest extends Request {
  user?: any;
}

export const authenticateToken = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Authentication token required" });
  }

  jwt.verify(token, "cmotesting123", (err, decoded) => {
    if (err) {
      return res
        .status(403)
        .json({ message: "Token expired. Please sign in again" });
    }

    req.user = decoded; // decoded now has id, name, role
    next();
  });
};
