import Router from"express";

import {verifyToken} from "../middlewares/auth.middleware.js"
import { isAdmin } from "../middlewares/role.middleware.js";
import { createCategory, deleteCategory, getAllCategories, getCategoryById, getCategoryBySlug, updateCategory } from "../controllers/category.controller.js";

const router=Router();

router.route("/")
.post(verifyToken,isAdmin,createCategory)
.get(verifyToken,getAllCategories)

router.get("/all",getAllCategories)

router.route("/:id")
.delete(verifyToken,isAdmin,deleteCategory)
.get(verifyToken,isAdmin,getCategoryById)
.put(verifyToken,isAdmin,updateCategory)

router.get("/single/:slug",getCategoryBySlug)

export default router