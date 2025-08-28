import React, { useEffect, useState } from "react";
import axios from "../../../api/axios";
import Loader from "../../../components/Loader";
import deleteicon from "../../../assets/bin_icon.svg";
import { toast } from "react-toastify";

export default function UserComment() {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchComments = async () => {
    try {
      setLoading(true);
      const response = await axios.get("comment/userComments", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setComments(response.data.data.comments);
    } catch (error) {
      console.log("Error fetching comments:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`comment/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      toast.success("Comment deleted successfully");
      setComments((prev) => prev.filter((c) => c._id !== id));
    } catch (error) {
      toast.error("Failed to delete comment");
      console.error(error);
    }
  };

  if (loading) {
    return (
      <div className="w-full text-center py-10">
        <Loader />
      </div>
    );
  }

  return (
    <div className="p-6">
      {comments && comments.length > 0 ? (
        <div className="overflow-x-auto shadow-lg rounded-lg">
          <table className="w-full border-collapse bg-white rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-gradient-to-r from-blue-900 to-blue-700 text-white text-left">
                <th className="px-4 py-3">Comment</th>
                <th className="px-4 py-3">Blog</th>
                <th className="px-4 py-3">User</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {comments.map((comment, idx) => (
                <tr
                  key={comment._id}
                  className={`border-b hover:bg-gray-50 transition ${
                    idx % 2 === 0 ? "bg-gray-50/40" : "bg-white"
                  }`}
                >
                  <td className="px-4 py-3 text-gray-700">{comment.content}</td>
                  <td className="px-4 py-3 font-medium text-blue-700">
                    {comment.blog?.title}
                  </td>
                  <td className="px-4 py-3">{comment.author?.username}</td>
                  <td className="px-4 py-3 text-sm text-gray-500">
                    {new Date(comment.createdAt).toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => handleDelete(comment._id)}
                      className="p-2 rounded-full hover:bg-red-100 transition"
                    >
                      <img src={deleteicon} width={20} alt="delete" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center mt-20 text-gray-600">
          <img
            src="https://cdn-icons-png.flaticon.com/512/4076/4076504.png"
            alt="no comments"
            className="w-28 mb-4 opacity-70"
          />
          <p className="text-lg font-medium">No Comments Found</p>
          <p className="text-sm text-gray-500">Start engaging by commenting on blogs!</p>
        </div>
      )}
    </div>
  );
}
