// middlewares/isOwnerOrAdmin.js
import { ApiError } from "../utils/ApiError.js";
import { Blog } from "../models/blog.model.js";

export const isOwnerOrAdmin = async (req, res, next) => {
  const blog = await Blog.findById(req.params.id);
  if (!blog) throw new ApiError(404, "Blog not found");

  if (req.user.role === "admin" || blog.author.toString() === req.user._id.toString()) {
    req.blog = blog; // attach blog to request
    return next();
  }

  throw new ApiError(403, "Access denied: not owner or admin");
};
