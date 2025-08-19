import Router from"express";
import { createComment, getAllComments, getCommentsByBlog } from "../controllers/comment.controller.js";
import {verifyToken} from "../middlewares/auth.middleware.js"
import { isAdmin } from "../middlewares/role.middleware.js";

const router=Router();

router.route("/add")
.post( verifyToken,createComment)

router.get("/",verifyToken,isAdmin,getAllComments)

router.route("/fetch/:blogId")
.get(getCommentsByBlog)



export default router