import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Blog } from "../models/blog.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { User } from "../models/user.model.js";
import { generateUniqueSlug } from "../utils/slug.utility.js";
import {Comment} from "../models/comment.model.js"
import {Category} from "../models/category.model.js"
import { log } from "console";

export const createBlog = asyncHandler(async (req, res) => {
  const { title, subTitle, description, category, isPublished } = req.body;
  
  
  const author=req.user._id;
   const slug = await generateUniqueSlug(title);

  if (!title || !description || !category ) {
    throw new ApiError(400, "All fields required");
  }
const existingCategory = await Category.findById(category);

  if (!existingCategory) {
    throw new ApiError(404, "Category not found");
  }
  const imageFile = req.file;
  if (!imageFile) {
    throw new ApiError(400, "Image file is required");
  }

  const imageLocalPath = imageFile.path;

  const image = await uploadOnCloudinary(imageLocalPath);

  const blog = await Blog.create({
    title,
    subTitle,
    description,
    category,
    isPublished,
    slug,
    image: image.url, // assuming you store the local path
    author: req.user?._id || null, // assuming user is authenticated and user info is in req.user
  });
  

  const createdBlog = await Blog.findById(blog._id);
  if (!createdBlog) {
    throw new ApiError(400, "Something went wrong while creating the blog");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, createdBlog, "Blog created successfully"));
});

export const getAllblogsAdmin = asyncHandler(async (req, res) => {
  const blogs = await Blog.find({}).populate("category", "name slug").sort({createdAt:-1});
  if (!blogs) {
    throw ApiError(404, "Blogs not found");
  }
  return res
    .status(201)
    .json(new ApiResponse(200, blogs, "All blogs fetched success fully"));
});

export const getAllblogsUser = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  const blogs = await Blog.find({ author: userId }).populate("category", "name slug").populate("author", "username").sort({ createdAt: -1 });

  if (blogs.length === 0) {
    throw new ApiError(404, "Blogs not found");
  }
  return res
    .status(201)
    .json(new ApiResponse(200, blogs, "All blogs fetched success fully"));
});

export const getAllblogs = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 6;
  const skip = (page - 1) * limit;

  // Total number of published blogs (for frontend pagination)
  const total = await Blog.countDocuments({ isPublished: true });

  const blogs = await Blog.find({ isPublished: true })
    .populate("category", "name slug")
    .populate("author", "username ")
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  if (!blogs || blogs.length === 0) {
    throw ApiError(404, "No published blogs found");
  }

  return res.status(200).json(
    new ApiResponse(200, {
      blogs,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    }, "All blogs fetched successfully")
  );
});

export const getSIngleBlog = asyncHandler(async (req, res) => {
  const { slug } = req.params;
  const blog = await Blog.findOne({slug}).populate("author", "username email ").populate("category","name slug")
  if (!blog) {
    throw ApiError(404, "Blog not found");
  }
  return res
    .status(201)
    .json(new ApiResponse(200, blog, " blog fetched success fully"));
});

export const getSingleBlogByAdmin = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const blog = await Blog.findById(id).populate("author", "username email ");
  if (!blog) {
    throw ApiError(404, "Blog not found");
  }
  return res
    .status(201)
    .json(new ApiResponse(200, blog, " blog fetched success fully"));
});

export const deleteblog = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const blogid = req.params.id;
  const role = req.user.role;
  

  await Comment.deleteMany({blog:blogid});
  const blog = await Blog.findById(blogid);
  if (!blog) {
    throw new ApiError(404, "Blog not found");
  }

  if (role === "user" && blog.author.toString() !== userId) {
    throw new ApiError(403, "Not authorized to delete this blog");
  }
  await Blog.findByIdAndDelete(blogid);
  return res
    .status(200)
    .json(new ApiResponse(200, "Blog deleted successfully"));
});

export const admindashboard = asyncHandler(async (req, res) => {
  try {

    const totalBlogs = await Blog.countDocuments();
    const totalUsers = await User.countDocuments();

    res
      .status(200)
      .json(
        new ApiResponse(200, { totalBlogs, totalUsers }, "Fetched successfully")
      );
  } catch (error) {
    console.error("Error fetching admin dashboard data:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

export const updateUserBlogs = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const blogId = req.params.id;
  const { title, subTitle, category, description, isPublished } = req.body;
  if (category) {
  const cat = await Category.findById(category);
  if (!cat) throw new ApiError(404, "Category not found");
}
  const blog = await Blog.findById(blogId);
  if (!blog) {
    throw new ApiError(404, "Blog not found");
  }


  if (blog.author.toString() !== userId) {
    throw new ApiError(403, "You are not an author of this blog");
  }

   if (title && title !== blog.title) {
      blog.slug = await generateUniqueSlug(title, blogId);
    }

  let imageUrl = blog.image;
  if (req.file) {
    const imageLocalPath = req.file.path;
    const image = await uploadOnCloudinary(imageLocalPath);
    if (!image?.url) {
      throw new ApiError(500, "Image upload failed");
    }
    imageUrl = image.url;
  }

  blog.title = title || blog.title;
  blog.subTitle = subTitle || blog.subTitle;
  blog.description = description || blog.description;
  blog.category = category || blog.category;
  blog.isPublished = isPublished !== undefined ? isPublished : blog.isPublished;
  blog.image = imageUrl;

  const updatedBlog = await blog.save();
  
  

  res
    .status(200)
    .json(new ApiResponse(200, updatedBlog, "Blog updated successfully"));
});

export const updateBlogAdmin = asyncHandler(async (req, res) => {
  const blogId = req.params.id;
  const { title, subTitle, category, description, isPublished } = req.body;
   if (category) {
  const cat = await Category.findById(category);
  if (!cat) throw new ApiError(404, "Category not found");
}

  const blog = await Blog.findById(blogId);
  if (!blog) {
    throw new ApiError(404, "Blog not found");
  }

   if (title && title !== blog.title) {
      blog.slug = await generateUniqueSlug(title, blogId);
    }

  
  let imageUrl = blog.image;
  if (req.file) {
    const imageLocalPath = req.file.path;
    const image = await uploadOnCloudinary(imageLocalPath);
    if (!image?.url) {
      throw new ApiError(500, "Image upload failed");
    }
    imageUrl = image.url;
  }



  // ✅ Update fields
  blog.title = title || blog.title;
  blog.subTitle = subTitle || blog.subTitle;
  blog.description = description || blog.description;
  blog.category = category || blog.category;
  blog.isPublished = isPublished !== undefined ? isPublished : blog.isPublished;
  blog.image = imageUrl;

  const updatedBlog = await blog.save();

  res
    .status(200)
    .json(new ApiResponse(200, updatedBlog, "Blog updated successfully"));
});

export const getUserBlogCount = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  const totalBlogs = await Blog.countDocuments({ author: userId });

  res.status(200).json(new ApiResponse(200, totalBlogs, "blog fetched"));
});

export const getdraftUserBlog = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const draftBlogs = await Blog.countDocuments({
    author: userId,
    isPublished: false,
  });

  if (draftBlogs === null) {
    return res.status(200).json(new ApiResponse(200, 0, "blog fetched"));
  }
  res.status(200).json(new ApiResponse(200, draftBlogs, "blog fetched"));
});

export const getBlogsByCategory = asyncHandler(async (req, res) => {
  const { slug } = req.params;
  const category = await Category.findOne({ slug });
  if (!category) throw new ApiError(404, "Category not found");

  const blogs = await Blog.find({ category: category._id, isPublished: true })
    .populate("author", "username")
    .populate("category", "name slug");

  res.status(200).json(new ApiResponse(200, blogs, "Blogs by category"));
});

