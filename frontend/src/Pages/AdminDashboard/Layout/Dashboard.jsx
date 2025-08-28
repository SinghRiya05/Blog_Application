import React, { useState, useEffect } from "react";
import axios from "../../../api/axios";
import { MessagesSquare, MessageSquareQuote } from "lucide-react";
import SmallCard from "../../UserDashboard/SmallCard";

export default function Dashboard() {
  const [data, setData] = useState({ totalBlogs: 0, totalUsers: 0 });

  const fetchData = async () => {
    try {
      const res = await axios.get("blog/admin", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setData(res.data.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="min-h-screen  p-6">
      <h1 className="text-3xl font-bold text-black text-center mb-10">
        📊 Admin Dashboard
      </h1>

      {/* Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        
        <SmallCard
          Icon={MessagesSquare}
          num={data.totalBlogs}
          content="Total Blogs"
        />

        <SmallCard
          Icon={MessageSquareQuote}
          num={data.totalUsers}
          content="Registrations"
        />

      </div>
    </div>
  );
}
