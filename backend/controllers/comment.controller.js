import { Comment } from "../models/comment.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { Blog } from "../models/blog.model.js";

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
    "author",
    "username"
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

export const getAllComments = asyncHandler(async (req, res) => {
  try {
    const comments = await Comment.find().populate("author");
    if (!comments) {
      throw new ApiError(404, "Comments not found");
    }

    res
      .status(200)
      .json(new ApiResponse(200, comments, "Comments fetched successfully"));
  } catch (error) {
    res.json(error);
  }
});

export const getUserComments = asyncHandler(async (req, res) => {
  try {
    if (!req.user) {
      throw new ApiError(401, "Unauthorize access");
    }

    const blogIds = await Blog.find({ author: req.user._id }).distinct("_id");

    if (!blogIds) {
      throw new ApiError(404, "Blogs id not found");
    }
    if (blogIds.length === 0) {
      return res
        .status(200)
        .json(new ApiResponse(200, { comments: [] }, "No comments found"));
    }

    const comments = await Comment.find({ blog: { $in: blogIds } })
      .populate("blog", "title")
      .populate("author", "username");

    return res
      .status(200)
      .json(
        new ApiResponse(200, { comments }, "Comments fetched successfully")
      );
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
});

export const deleteComment = asyncHandler(async (req, res) => {
  try {
    const comment_id = req.params;

    await Comment.findByIdAndDelete(comment_id.id);
    return res
      .status(200)
      .json(new ApiResponse(200, "", "Comment deleted successfully"));
  } catch (error) {
    console.log(error);
  }
});

export const getCommentsCountOnUserBlogs = asyncHandler(async (req, res) => {
  console.log("hey");
  const BlogIds = await Blog.find({ author: req.user._id }).distinct("_id");
  const commentsCounts = await Comment.countDocuments({
    blog: { $in: BlogIds },
  });

  return res.status(200).json(new ApiResponse(200, commentsCounts, "Fetched"));
});
