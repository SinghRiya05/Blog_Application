import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { Category } from "../models/category.model.js";

export const createCategory = asyncHandler(async (req, res) => {
  
  
  const { name, description } = req.body;
  if (!name || !description) {
    throw new ApiError(409, "missing required field");
  }

  const existing = await Category.findOne({ name });
  if (existing) {
    throw new ApiError(401, "Category exist");
  }

  const category = await Category.create({
    name,
    description,
  });
  if (!category) {
    throw new ApiError(500, "Creation failed");
  }
  res
    .status(201)
    .json(new ApiResponse(201, category, "Category created successfully"));
});

export const updateCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  if (!name || !description) {
    throw new ApiError(400, "Missing required fields");
  }
  const category = await Category.findById(id);
  if (!category) {
    throw new ApiError(404, "Category not found");
  }
  const existing = await Category.findOne({ name, _id: { $ne: id } });
  if (existing) {
    throw new ApiError(409, "Category name already in use");
  }
  category.name = name;
  category.description = description;

  await category.save();

  res
    .status(200)
    .json(new ApiResponse(200, category, "Category updated successfully"));
});

export const deleteCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const category = await Category.findById(id);
  if (!category) {
    throw new ApiError(404, "Category not found");
  }
  await Category.findByIdAndDelete(id);
  res
    .status(200)
    .json(new ApiResponse(200, null, "Category deleted successfully"));
});

export const getAllCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find({}).sort({createdAt:-1})
  if (!categories || categories.length === 0) {
    throw new ApiError(404, "No categories found");
  }
  res
    .status(200)
    .json(new ApiResponse(200, categories, "Categories fetched successfully"));
});

export const getCategoryBySlug=asyncHandler(
    async(req,res)=>{
        const category=await Category.findOne({slug:req.params.slug})
        if(!category){
            throw new ApiError(404,"Category not found")
        }
        res.status(201).json(
            new ApiResponse(200,category,"Category fetched successfully")
        )
    }
)
export const getCategoryById=asyncHandler(
    async(req,res)=>{
        const {id}=req.params;
        const category=await Category.findById(id)
        if(!category){
            throw new ApiError(404,"Category not found")
        }
        res.status(201).json(
            new ApiResponse(200,category,"Category fetched successfully")
        )
    }
)