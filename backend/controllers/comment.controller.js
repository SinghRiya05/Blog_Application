import { Comment } from "../models/comment.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

export const createComment = asyncHandler(async (req, res) => {
  const { blogId, comment } = req.body;
  if (!blogId || !comment) {
    throw new ApiError(400, "Missing required fields");
  }
 
  const newComment = await Comment.create({
    blog: blogId,
    content: comment,
    author: req.user.id,
  });

 await newComment.populate("author", "username");

  if (!newComment) {
    throw new ApiError(400, "Error while generating the comment");
  }
  res
    .status(201)
    .json(new ApiResponse(200, newComment, "Comment added successfully"));
});



export const getCommentsByBlog = asyncHandler(async (req, res) => {
  const comments = await Comment.find({ blog: req.params.blogId }).populate(
    "author","username"
  );
  if (!comments) {
    throw new ApiError(404, "Comments not found");
  }
  res
    .status(201)
    .json(
      new ApiResponse(
        200,
        { comments },
        "All Comments are fetched successfully"
      )
    );
});
