import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../../api/axios";
import deleteicon from "../../../assets/bin_icon.svg";
import { toast } from "react-toastify";
import Loader from "../../../components/Loader";

export default function UserBloglist() {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const [blogs, setBlogs] = useState([]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/blog/${id}`);
      toast.success("🗑️ Blog deleted successfully");
      setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog._id !== id));
    } catch (error) {
      toast.error("❌ Deletion failed");
      console.log(error);
    }
  };

  useEffect(() => {
    setLoader(true);
    const fetchUserBlogs = async () => {
      try {
        const response = await axios.get(`/blog/AllUserBlog`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setBlogs(response.data.data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoader(false);
      }
    };

    fetchUserBlogs();
  }, []);

  if (loader) {
    return (
      <div className="w-full text-center py-10">
        <Loader />
      </div>
    );
  }

  if (blogs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center mt-20 text-gray-600">
        <img
          src="https://cdn-icons-png.flaticon.com/512/4076/4076504.png"
          alt="empty blogs"
          className="w-28 mb-4 opacity-70"
        />
        <p className="text-lg font-medium">📭 No Blogs Found</p>
        <p className="text-sm text-gray-500">
          Start writing your first blog and share your thoughts!
        </p>
      </div>
    );
  }

  return (
    <div className="w-full p-6 overflow-x-auto">
      <div className="shadow-lg rounded-lg overflow-hidden">
        <table className="w-full border-collapse bg-white rounded-lg">
          <thead>
            <tr className="bg-gradient-to-r from-blue-800 to-blue-600 text-white text-left">
              <th className="px-6 py-3 font-semibold">Title</th>
              <th className="px-6 py-3 font-semibold">Date</th>
              <th className="px-6 py-3 text-center font-semibold">Status</th>
              <th className="px-6 py-3 text-center font-semibold">Delete</th>
              <th className="px-6 py-3 text-center font-semibold">Update</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((blog, index) => (
              <tr
                key={blog._id}
                className={`${
                  index % 2 === 0 ? "bg-gray-50/40" : "bg-white"
                } hover:bg-gray-100 transition`}
              >
                {/* Title */}
                <td className="px-6 py-3 font-medium text-gray-800">
                  {blog.title}
                </td>

                {/* Date */}
                <td className="px-6 py-3 text-gray-600">
                  {new Date(blog.createdAt).toLocaleDateString()}
                </td>

                {/* Status */}
                <td className="px-6 py-3 text-center">
                  <span
                    className={`px-3 py-1 text-sm rounded-full ${
                      blog.status === "Draft"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {blog.status || "Published"}
                  </span>
                </td>

                {/* Delete */}
                <td className="px-6 py-3 text-center">
                  <button
                    onClick={() => handleDelete(blog._id)}
                    className="p-2 rounded-full hover:bg-red-100 transition"
                  >
                    <img src={deleteicon} width={20} alt="delete" />
                  </button>
                </td>

                {/* Edit */}
                <td className="px-6 py-3 text-center">
                  <button
                    onClick={() => navigate(`/user/editBlog/${blog.slug}`)}
                    className="text-blue-600 hover:text-blue-400 font-medium"
                  >
                    ✏️ Edit Blog
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
