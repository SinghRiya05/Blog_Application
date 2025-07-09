import { Router } from "express";
import { upload} from "../middlewares/multer.middleware.js"
import { admindashboard, createBlog, deleteblog, getAllblogs, getAllblogsAdmin, getAllblogsUser, getSIngleBlog } from "../controllers/blog.controller.js";
import { isAdmin } from "../middlewares/role.middleware.js";

 
    import { verifyToken } from "../middlewares/auth.middleware.js";
const router=Router();

router.route("/")
.post(
  verifyToken, upload.single("image"),createBlog
).get(
    verifyToken,isAdmin,getAllblogsAdmin
)

router.route("/AllBlog")
.get(getAllblogs)

router.route("/AllUserBlog")
.get(verifyToken,getAllblogsUser)

router.route("/admin")
.get(verifyToken,isAdmin,admindashboard)

router.route("/:id")
.get(
    getSIngleBlog
)
.delete(verifyToken,deleteblog)





export default router;