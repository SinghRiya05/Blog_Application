import React, { useState, useEffect } from "react";
import BlogCard from "./BlogCard";
import Loader from "../../components/Loader";
import axios from "../../api/axios";
import { motion, AnimatePresence } from "framer-motion";

export default function AllBlog() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 6;

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`/blog/AllBlog?page=${page}&limit=${limit}`);
        setBlogs(res.data.data.blogs);
        setTotalPages(res.data.data.totalPages);
      } catch (err) {
        console.error("Error fetching blogs:", err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, [page]);

  if (loading) return <Loader />;

  return (
    <div className="bg-gray-50 min-h-screen text-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-10">
        
        {/* Title */}
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold text-gray-900">
            Browse <span className="text-blue-800">All Blogs</span>
          </h2>
          <p className="text-gray-600 mt-2">
            Explore the latest insights, tips, and stories from our community.
          </p>
          <div className="mt-3 w-16 h-1 bg-blue-800 mx-auto rounded-full"></div>
        </div>

        {/* Blog Cards */}
        {blogs.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <p className="text-xl text-gray-500">No Blogs Found</p>
            <span className="text-sm text-gray-400">
              Be the first one to post!
            </span>
          </div>
        ) : (
          <motion.div
            layout
            className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
          >
            <AnimatePresence>
              {blogs.map((blog, index) => (
                <motion.div
                  key={blog._id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.1, // stagger effect
                  }}
                >
                  <BlogCard blog={blog} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Pagination */}
        <div className="flex justify-center items-center gap-3 mt-12">
          <motion.button
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.05 }}
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className="px-5 py-2 text-sm font-medium text-white bg-blue-900 rounded-full hover:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Prev
          </motion.button>

          <span className="text-lg font-semibold text-gray-700">
            Page {page} of {totalPages}
          </span>

          <motion.button
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.05 }}
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={page === totalPages}
            className="px-5 py-2 text-sm font-medium text-white bg-blue-900 rounded-full hover:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </motion.button>
        </div>
      </div>
    </div>
  );
}
