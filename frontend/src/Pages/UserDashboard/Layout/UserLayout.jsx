import React, { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "../../../api/axios";
import logo from "../../../assets/blog-logo.svg";
import Sidebar from "../Sidebar_Elements/UserSidebar";

const defaultImage = "https://cdn-icons-png.flaticon.com/512/149/149071.png";

export default function UserLayout() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    (async () => {
      const token = localStorage.getItem("token");
      if (!token) return;
      try {
        const res = await axios.get("user/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    toast.success("User logged out successfully");
    navigate("/");
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <header className="flex justify-between items-center border-b shadow-sm p-3 bg-white">
        {/* Logo */}
        <div
          className="flex items-center cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img src={logo} alt="logo" className="w-10 h-10" />
          <p className="ml-3 font-bold text-lg text-gray-800">MyBlogSpace</p>
        </div>

        {/* User Info + Logout */}
        <div className="flex items-center gap-4 lg:mr-5">
          {user && (
            <div className="hidden md:flex items-center gap-2">
              <img
                src={user?.profilePic || defaultImage}
                alt="user"
                className="w-8 h-8 rounded-full border"
              />
              <span className="font-medium text-gray-700">
                {user.username}
              </span>
            </div>
          )}

          <button
            onClick={logout}
            className="py-1.5 px-5 rounded-lg text-white font-semibold bg-blue-900 hover:bg-blue-800 transition"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Sidebar + Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-20 md:w-64 bg-white border-r shadow-sm overflow-y-auto">
          <Sidebar />
        </aside>

        {/* Main Outlet */}
        <main className="flex-1 overflow-y-auto bg-gray-50 p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
