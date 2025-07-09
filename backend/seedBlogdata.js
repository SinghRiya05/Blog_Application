import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();
import { Blog } from "./models/blog.model.js" // adjust path as needed
 


const url=process.env.MONGO_URL;
console.log(url);

mongoose.connect(`${url}/blogs`)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB error:", err));

  const dummyBlogs = [
  {
    title: "AI in Everyday Life",
    subTitle: "The rise of smart devices",
    description: "Explore how artificial intelligence is reshaping our homes and workplaces.",
    category: "technology",
    image: "https://images.unsplash.com/photo-1581090700227-1e8e8cfd3f56?auto=format&fit=crop&w=800&q=80",
    isPublished: true,
    author:"686c218583a418d9cda3685c"

  },
  {
    title: "How to Start Your Own Startup",
    subTitle: "From idea to execution",
    description: "A guide for beginners to launch a successful startup in 2025.",
    category: "startup",
    image: "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=800",
    isPublished: true,
    author:"686c218583a418d9cda3685c"

  },
  {
    title: "Minimalist Living Tips",
    subTitle: "Less is more",
    description: "Learn how to simplify your lifestyle and improve mental well-being.",
    category: "lifestyle",
    image: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=800&q=80",
    isPublished: true,
    author:"686c218583a418d9cda3685c"

  },
  {
    title: "Investing for Beginners",
    subTitle: "How to grow your money",
    description: "A basic guide to stocks, mutual funds, and personal finance.",
    category: "finance",
    image: "https://images.pexels.com/photos/4968633/pexels-photo-4968633.jpeg?auto=compress&cs=tinysrgb&w=800",
    isPublished: true,
    author:"686c218583a418d9cda3685c"

  },
  {
    title: "Tech Draft",
    subTitle: "Still under work",
    description: "This is a draft blog for internal testing.",
    category: "technology",
    image: "https://images.unsplash.com/photo-1535223289827-42f1e9919769?auto=format&fit=crop&w=800&q=80",
    isPublished: false,
    author:"686c218583a418d9cda3685c"
  }
];

const seedBlogs = async () => {
  try {
    // await Blog.deleteMany(); // clear old data (optional)
    await Blog.insertMany(dummyBlogs);
    console.log("✅ Dummy blogs inserted");
    process.exit(0);
  } catch (err) {
    console.error("❌ Seeding error:", err);
    process.exit(1);
  }
};

seedBlogs();