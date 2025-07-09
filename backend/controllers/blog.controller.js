import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Blog } from "../models/blog.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { User } from "../models/user.model.js";

export const createBlog=asyncHandler(
  async(req,res)=>{
    const {title,subTitle,description,category,isPublished}=req.body;
  //    if (
  //   [title, subtitle, description, category].some(
  //     (field) => typeof field !== "string" || field.trim() === ""
  //   )
  // ) {
  //   throw new ApiError(400, "All fields are required and must be non-empty strings");
  // }

        const imageFile = req.file;
        if(!imageFile){
          throw new ApiError(400, "Image file is required");
        }

        console.log(req.user);
        

  const imageLocalPath = imageFile.path;

  const image=await uploadOnCloudinary(imageLocalPath)

  const blog = await Blog.create({
    title,
    subTitle,
    description,
    category,
    isPublished,
    image: image.url, // assuming you store the local path
    author: req.user?._id || null // assuming user is authenticated and user info is in req.user
  });
     
 const createdBlog=await Blog.findById(blog._id);
 if(!createdBlog){
  throw new ApiError(400,"Something went wrong while creating the blog")
 }

 return res.status(201).json(
  new ApiResponse(200,createdBlog,"Blog created successfully")
 )
  }
)

export const getAllblogsAdmin=asyncHandler(
  async(req,res)=>{
    const blogs=await Blog.find({});
    if(!blogs){
         throw ApiError(404,"Blogs not found");
    }
    return res.status(201).json(
      new ApiResponse(200,blogs,"All blogs fetched success fully")
    )
  }
)
export const getAllblogsUser=asyncHandler(
  async(req,res)=>{
    const userId=req.user.id;
    
    const blogs=await Blog.find({author:userId}).sort({createdAt:-1});
    
    
    if(blogs.length===0){
         throw new ApiError(404,"Blogs not found");
    }
    return res.status(201).json(
      new ApiResponse(200,blogs,"All blogs fetched success fully")
    )
  }
)
export const getAllblogs=asyncHandler(
  async(req,res)=>{
    const blogs=await Blog.find({isPublished:true}).sort({createdAt:-1});
    if(!blogs || blogs.length===0){
         throw ApiError(404,"No published blogs found");
    }
    return res.status(201).json(
      new ApiResponse(200,blogs,"All blogs fetched success fully")
    )
  }
)

export const getSIngleBlog=asyncHandler(
  async(req,res)=>{
    const {id}=req.params;
    const blog= await Blog.findById(id).populate("author",'username email ');
    if(!blog){
      throw ApiError(404,"Blog not found");
    }
    return res.status(201).json(
      new ApiResponse(200,blog," blog fetched success fully")
    )
  }
)

export const deleteblog=asyncHandler(
  async(req,res)=>{
    const userId=req.user.id;
    const blogid=req.params.id;
    const role=req.user.role;
    console.log(req.user.role);
    
   const blog=await Blog.findById(blogid);
   if(!blog){
    throw new ApiError(404,"Blog not found")
   }

   if( role==="user" && blog.author.toString()!==userId){
    throw new ApiError(403,"Not authorized to delete this blog")
   }
   await Blog.findByIdAndDelete(blogid);
   return res.status(200).json(new ApiResponse(200,"Blog deleted successfully")) 
  }
)

export const admindashboard=()=>asyncHandler(
async(req,res)=>{
  const totalBlogs=await Blog.countDocuments();
  const totalUsers=await User.countDocuments();
  console.log(totalBlogs);
  
  res.status(200).json(
    new ApiResponse(200,{totalBlogs,totalUsers},"fetched successfully")
  )
  
}
)

