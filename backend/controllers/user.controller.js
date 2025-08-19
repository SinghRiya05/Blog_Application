import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import jwt from "jsonwebtoken";

export const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (
    [email, username, password].some(
      (field) => typeof field !== "string" || field.trim() === ""
    )
  ) {
    throw new ApiError(
      400,
      "All fields are required and must be non-empty strings"
    );
  }
  const existedUser = await User.findOne({ $or: [{ username }, { email }] });
  if (existedUser) {
    throw new ApiError(409, "User already exists with this email or username");
  }
  const newUser = await User.create({
    username,
    email,
    password,
  });

  const createdUser = await User.findById(newUser._id).select("-password");

  if (!createdUser) {
    throw new ApiError(500, "Something went worng while registering the user");
  }
  console.log("registered");

  return res
    .status(201)
    .json(new ApiResponse(201, createdUser, "User Registered Successfully"));
});

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email) {
    throw new ApiError(400, " email is required");
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(404, "User not found");
  }
  const isMatch = await user.isPasswordCorrect(password);
  if (!isMatch) {
    throw new ApiError(401, "Invalid User credentials");
  }
  const loggendInUser = await User.findById(user._id).select("-password");
  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );
  const options = {
    httpOnly: true,
    secure: false,
    sameSite: "Lax",
    path: "/",
  };

  return res
    .status(200)
    .cookie("token", token, options)
    .json(
      new ApiResponse(
        201,
        { loggendInUser, token },
        "User Logged in successfully"
      )
    );
});

export const logoutUser = asyncHandler(async (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: false,
    sameSite: "None", // cross-origin ke liye
  });

  return res
    .status(200)
    .json(new ApiResponse(200, null, "User logged out successfully"));
});

export const getAllUser=asyncHandler(
  async(req,res)=>{
   try {
     const allUsers=await User.find();
     if(!allUsers){
       throw new ApiError("404","User not found")
     }
     res.status(200).json(
       new ApiResponse(200,allUsers,"Users fetched successfully")
     )
   } catch (error) {
    throw new ApiError(500,"error in fetching Users")
   }
  }
)