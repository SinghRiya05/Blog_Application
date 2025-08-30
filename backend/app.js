import express from "express"
const app=express();
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.routes.js"
import blogRouter from "./routes/blog.routes.js"
import commentRouter from "./routes/comment.routes.js"
import categoryRouter from "./routes/category.routes.js"
import { errorMiddleware } from "./middlewares/error.middleware.js";

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "https://blog-application-tau-steel.vercel.app/"
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true, // important
}));

app.use(express.urlencoded({extended:true,limit:"16kb"}))

app.use(express.static("public"))

app.use(cookieParser())

app.use("/user",userRouter)
app.use("/blog",blogRouter)
app.use("/comment",commentRouter)
app.use("/category",categoryRouter)
app.use(errorMiddleware);

export{app}