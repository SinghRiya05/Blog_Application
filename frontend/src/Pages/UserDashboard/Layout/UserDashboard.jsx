import React, { useState, useEffect } from "react";
import SmallCard from "../SmallCard";
import axios from "../../../api/axios";
import Loader from "../../../components/Loader";
import { MessagesSquare, MessageSquareQuote, MessageCircleMore } from "lucide-react";
import UserBloglist from "../CRUD/UserBloglist";

export default function UserDashboard() {
  const [user, setUser] = useState("");
  const [count, setCount] = useState(0);
  const [draft, setDraft] = useState(0);
  const [loading, setLoading] = useState(true);
  const [countComments, setCountComments] = useState(0);

  const token = localStorage.getItem("token");

  const fetchUser = async () => {
    setLoading(true);
    const res = await axios.get("user/me", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setUser(res.data);
  };

  const fetchUserBlogStats = async () => {
    try {
      setLoading(true);
      const [countRes, draftRes, countComm] = await Promise.all([
        axios.get("blog/user/count", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get("blog/user/draft", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get("comment/countComment", {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);
      setCount(countRes.data.data);
      setDraft(draftRes.data.data);
      setCountComments(countComm.data.data);
    } catch (err) {
      console.error("Failed to fetch dashboard stats:", err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserBlogStats();
    fetchUser();
  }, []);

  if (loading)
    return (
      <div className="w-full flex items-center justify-center h-[70vh]">
        <Loader />
      </div>
    );

  return (
    <section className="p-6 md:p-10 w-full bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      {/* Welcome Header */}
      <div className="text-center mb-16">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
          Welcome, <span className="text-blue-600">{user.username}</span> 👋
        </h1>
        <p className="text-gray-600 mt-2 text-sm md:text-base">
          Here’s a quick overview of your blogging activity
        </p>
      </div>

      {/* Stats Section */}
      <div className="flex flex-wrap justify-center gap-6">
        <SmallCard Icon={MessagesSquare} content="Total Blogs" num={count} />
        <SmallCard Icon={MessageSquareQuote} content="Drafts" num={draft} />
        <SmallCard Icon={MessageCircleMore} content="Comments" num={countComments} />
      </div>

      {/* Recent Blogs */}
      <div className="mt-16">
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 text-center mb-8">
          ✍️ Recent Blogs
        </h2>
        <div className="bg-white shadow-md rounded-2xl p-6">
          <UserBloglist />
        </div>
      </div>
    </section>
  );
}
