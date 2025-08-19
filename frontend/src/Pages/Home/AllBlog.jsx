import React, { useState, useEffect } from "react";
import BlogCard from "./BlogCard";
import Loader from "../../components/Loader";
import axios from "../../api/axios";

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
        const res = await axios.get(
          `/blog/AllBlog?page=${page}&limit=${limit}`
        );
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
    <div className="bg-gray-100 text-center text-gray-800">
      <div className="px-5 text-center py-8  bg-opacity-80 ">
       <h2 className="text-center text-4xl font-bold mb-8">Browse All Blogs</h2>
        {/* Blog Cards */}
        {blogs.length === 0 ? (
          <div className="text-center mt-10 text-xl">No Blogs Found</div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 md:grid-cols-2 ">
            {blogs.map((blog) => (
              <BlogCard key={blog._id} blog={blog} />
            ))}
          </div>
        )}

        {/* Pagination Controls */}
        <div className="flex justify-center items-center gap-4 mt-10">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className="px-4 py-2 text-white bg-blue-950 rounded hover:bg-blue-800 disabled:opacity-50"
          >
            Prev
          </button>

          <span className="text-lg font-semibold">
            Page {page} of {totalPages}
          </span>

          <button
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={page === totalPages}
            className="px-4 py-2 text-white bg-blue-950 rounded hover:bg-blue-800 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
