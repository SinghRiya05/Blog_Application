import mongoose from "mongoose";
import { config } from "dotenv";
import slugify from "slugify";
import { Blog } from "./models/blog.model.js"; // Adjust if needed

// Load environment variables
config();

const updateSlugs = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(`${process.env.MONGO_URL}/blogs`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Find blogs that don't have a slug
    const blogs = await Blog.find({ slug: { $exists: false } });

    // Loop through each blog and update slug
    for (let blog of blogs) {
      blog.slug = slugify(blog.title, { lower: true, strict: true });
      await blog.save();
      console.log(`✅ Slug updated for: "${blog.title}" → ${blog.slug}`);
    }

    console.log("🎉 All slugs updated successfully!");
  } catch (error) {
    console.error("❌ Error updating slugs:", error);
  } finally {
    await mongoose.disconnect();
  }
};

updateSlugs();
