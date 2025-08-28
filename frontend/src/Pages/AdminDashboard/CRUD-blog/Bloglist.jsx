import React, { useEffect, useState } from "react";
import axios from "../../../api/axios";
import deleteicon from "../../../assets/bin_icon.svg";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Bloglist() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/blog/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      toast.success("Blog deleted successfully ✅");
      setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog._id !== id));
    } catch (error) {
      toast.error("Blog deletion failed ❌");
      console.error(error.message);
    }
  };

  useEffect(() => {
    const fetchAdminBlogs = async () => {
      try {
        const response = await axios.get(`/blog`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setBlogs(response.data.data);
      } catch (error) {
        toast.error("Failed to fetch blogs ❌");
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAdminBlogs();
  }, []);

  return (
    <div className="w-full p-4">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">All Blogs</h2>

      {loading ? (
        <p className="text-center text-gray-500">Loading blogs...</p>
      ) : blogs.length === 0 ? (
        <p className="text-center text-gray-500">No blogs found</p>
      ) : (
        <div className="overflow-x-auto shadow-md rounded-xl">
          <table className="w-full border-collapse bg-white rounded-xl overflow-hidden">
            <thead>
              <tr className="bg-blue-950 text-white">
                <th className="px-6 py-3 text-left">Title</th>
                <th className="px-6 py-3 text-left">Date</th>
                <th className="px-6 py-3 text-left">Status</th>
                <th className="px-6 py-3 text-center">Delete</th>
                <th className="px-6 py-3 text-center">Update</th>
              </tr>
            </thead>
            <tbody>
              {blogs.map((blog, i) => (
                <tr
                  key={blog._id}
                  className={`border-b hover:bg-blue-50 transition ${
                    i % 2 === 0 ? "bg-gray-50" : "bg-white"
                  }`}
                >
                  <td className="px-6 py-3 font-medium text-gray-800">
                    {blog.title}
                  </td>
                  <td className="px-6 py-3 text-gray-500">
                    {new Date(blog.createdAt).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                  <td
                    className={`px-6 py-3 font-semibold ${
                      blog.isPublished ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {blog.isPublished ? "Published" : "Unpublished"}
                  </td>
                  <td className="px-6 py-3 text-center">
                    <button
                      onClick={() => handleDelete(blog._id)}
                      className="p-2 rounded-full hover:bg-red-100 transition"
                    >
                      <img src={deleteicon} width={20} alt="delete" />
                    </button>
                  </td>
                  <td className="px-6 py-3 text-center">
                    <button
                      onClick={() => navigate(`/admin/editBlog/${blog._id}`)}
                      className="cursor-pointer text-blue-700 underline hover:text-blue-400"
                    >
                      Edit Blog
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
