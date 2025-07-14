import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const verifyToken = asyncHandler(
  async (req, res, next) => {
    try {
      let token;
      if (req.cookies && req.cookies.token) {
        token = req.cookies.token;
      }
      // ✅ Check Authorization header (Bearer token)
      else if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer ")
      ) {
        token = req.headers.authorization.split(" ")[1];
      }

      // ❌ No token found
      if (!token) {
        throw new ApiError(401, "Unauthorized - No token provided");
      }

      // ✅ Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // ✅ Attach user to request
      req.user = await User.findById(decoded.id).select("-password");

      if (!req.user) {
        throw new ApiError(401, "Unauthorized - User not found");
      }

      next();
    } catch (error) {
      console.error("Token verification error:", error.message);
      next(new ApiError(401, "Unauthorized - Invalid or expired token"));
    }
  }
);
