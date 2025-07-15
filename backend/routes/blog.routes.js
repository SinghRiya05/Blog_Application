import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import {
  admindashboard,
  createBlog,
  deleteblog,
  getAllblogs,
  getAllblogsAdmin,
  getAllblogsUser,
  getBlogsByCategory,
  getdraftUserBlog,
  getSIngleBlog,
  getSingleBlogByAdmin,
  getUserBlogCount,
  updateBlogAdmin,
  updateUserBlogs,
} from "../controllers/blog.controller.js";
import { isAdmin } from "../middlewares/role.middleware.js";

import { verifyToken } from "../middlewares/auth.middleware.js";
const router = Router();

router
  .route("/")
  .post(verifyToken, upload.single("image"), createBlog)
  .get(verifyToken, isAdmin, getAllblogsAdmin);

router.route("/AllBlog").get(getAllblogs);

router.route("/AllUserBlog").get(verifyToken, getAllblogsUser);

router.route("/admin").get(admindashboard);

router.route("/slug/:slug").get(getSIngleBlog)

router.route("/:id").delete(verifyToken, deleteblog);

router
  .route("/admin/:id")
  .put(verifyToken, isAdmin, upload.single("image"), updateBlogAdmin)
  .get(verifyToken,isAdmin,getSingleBlogByAdmin)

router
  .route("/user/:id")
  .put(verifyToken, upload.single("image"), updateUserBlogs)
  

  

router.route("/user/count").get(verifyToken, getUserBlogCount);

router.route("/user/draft").get(verifyToken, getdraftUserBlog);

router.get("/category/:slug",getBlogsByCategory)

export default router;