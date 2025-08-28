import React, { useState } from "react";
import logo from "../../../assets/blog-logo.svg";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import { toast } from "react-toastify";
import { Menu } from "lucide-react"; // icon for toggle

export default function Layout() {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const logout = () => {
    localStorage.removeItem("token");
    toast.success("User logged out successfully");
    navigate("/");
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm flex justify-between items-center px-4 lg:px-8 py-3">
        <div className="flex items-center gap-3">
          {/* Sidebar toggle (only mobile/tablet) */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <Menu size={22} />
          </button>

          <img
            src={logo}
            alt="Logo"
            width={45}
            className="cursor-pointer"
            onClick={() => navigate("/")}
          />
          <p className="text-lg font-semibold hidden sm:block">MyBlogSpace</p>
        </div>

        <button
          onClick={logout}
          className="bg-blue-950 hover:bg-blue-800 text-white px-5 py-2 rounded-xl transition duration-300"
        >
          Logout
        </button>
      </div>

      {/* Body with Sidebar + Main content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        {isSidebarOpen && (
          <div className="bg-white border-r border-gray-200 shadow-md h-full overflow-y-auto transition-all duration-300">
            <Sidebar />
          </div>
        )}

        {/* Main content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-50">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
