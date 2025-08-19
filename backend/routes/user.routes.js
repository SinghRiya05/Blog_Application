import { Router } from "express";
import { getAllUser, loginUser, logoutUser, registerUser } from "../controllers/user.controller.js";
import {verifyToken} from "../middlewares/auth.middleware.js"
import { isAdmin } from "../middlewares/role.middleware.js";

const router=Router();

router.route("/register")
.post(registerUser)

router.route("/login")
.post(loginUser)

router.route("/logout")
.post(logoutUser)

router.get("/",verifyToken,isAdmin,getAllUser)

export default router;