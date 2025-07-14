import Router from"express";
import { createComment, getCommentsByBlog } from "../controllers/comment.controller.js";
import {verifyToken} from "../middlewares/auth.middleware.js"

const router=Router();

router.route("/add")
.post( verifyToken,createComment)



router.route("/fetch/:blogId")
.get(getCommentsByBlog)



export default router