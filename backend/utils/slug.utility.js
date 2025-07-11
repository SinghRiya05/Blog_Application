import slugify from "slugify";
import { Blog } from "../models/blog.model.js";

export const generateUniqueSlug = async (title, currentBlogId = null) => {
  let baseSlug = slugify(title, { lower: true, strict: true });
  let slug = baseSlug;
  let count = 1;

  let query = currentBlogId
    ? { slug, _id: { $ne: currentBlogId } } // Ignore current blog while updating
    : { slug };

  while (await Blog.exists(query)) {
    slug = `${baseSlug}-${count}`;
    count++;
    query.slug = slug;
  }

  return slug;
};
