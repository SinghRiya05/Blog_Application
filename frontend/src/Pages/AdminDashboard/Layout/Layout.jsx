import React from 'react';
import logo from "../../../assets/blog-logo.svg";
import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import { toast } from "react-toastify";

export default function Layout() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    toast.success("User logged out successfully");
    navigate("/");
  };

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <div className='border border-gray-100 shadow-sm flex justify-between'>
        <div className='flex items-center lg:mx-5 p-3 cursor-pointer '>
          <img src={logo} alt="Logo" width={50} onClick={() => navigate("/")} />
          <p className='text-lg font-semibold ml-4'>MyBlogSpace</p>
        </div>
        <button
          onClick={logout}
          className="h-12 px-5 py-2 mt-3 mr-5 lg:mr-16 border-none text-white rounded-xl lg:text-base sm:text-sm cursor-pointer bg-blue-950"
          
        >
          Logout
        </button>
      </div>

      {/* Body with Sidebar + Main content */}
      <div className='flex flex-1 overflow-hidden'>
        {/* Sidebar stays fixed in height, scrolls internally if needed */}
        <div className=" bg-gray-100 h-full overflow-y-auto">
          <Sidebar />
        </div>

        {/* Main content scrolls independently */}
        <div className='flex-1 overflow-y-auto p-4'>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
