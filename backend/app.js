import express from "express"
const app=express();
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.routes.js"
import blogRouter from "./routes/blog.routes.js"
import commentRouter from "./routes/comment.routes.js"
import { errorMiddleware } from "./middlewares/error.middleware.js";
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))

app.use(express.json({limit:"16kb"}))

app.use(express.urlencoded({extended:true,limit:"16kb"}))

app.use(express.static("public"))

app.use(cookieParser())

app.use("/user",userRouter)
app.use("/blog",blogRouter)
app.use("/comment",commentRouter)
app.use(errorMiddleware);

export{app}