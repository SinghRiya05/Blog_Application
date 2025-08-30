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
  "https://blog-application-3i3c.vercel.app", // apna actual domain dalna
];

app.use(cors({
  origin: (origin, cb) => {
    if (!origin || allowedOrigins.includes(origin) || /\.vercel\.app$/.test(origin)) {
      cb(null, true);
    } else {
      cb(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));
app.use("/uploads", express.static("uploads"));
app.use(express.json({limit:"16kb"}))

app.use(express.urlencoded({extended:true,limit:"16kb"}))

app.use(express.static("public"))

app.use(cookieParser())

app.use("/user",userRouter)
app.use("/blog",blogRouter)
app.use("/comment",commentRouter)
app.use("/category",categoryRouter)
app.use(errorMiddleware);

export{app}