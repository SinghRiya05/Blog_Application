import jwt from "jsonwebtoken"
import { User } from "../models/user.model.js"
import { ApiError } from "../utils/ApiError.js"
import { asyncHandler } from "../utils/asyncHandler.js"

export const verifyToken=asyncHandler(
    async(req,res,next)=>{
        try {
            const token=req.cookies.token;
            if (!token) {
      throw new ApiError(401, 'Unauthorized - No token');
            }

const decoded=jwt.verify(token,process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password');

     if (!req.user) {
      throw new ApiError(401, 'User not found');
    }

    next();
    


        } catch (error) {
            next(new ApiError(401, 'Unauthorized - Invalid token'));
        }
    }
)