import React from "react";
import { NavLink } from "react-router-dom";
import homeicon from "../../../assets/home_icon.svg";
import plusicon from "../../../assets/add_icon.svg";
import listicon from "../../../assets/list_icon.svg";
import commenticon from "../../../assets/comment_icon.svg";

export default function UserSidebar() {
  const linkStyle =
    "flex items-center gap-3 py-3.5 px-3 md:px-8 rounded-lg transition-all duration-200 cursor-pointer hover:bg-slate-100 hover:shadow-sm";

  const activeStyle =
    "bg-blue-100 text-blue-700 font-semibold border-r-4 border-blue-600";

  return (
    <div className="flex flex-col border-r border-gray-200 min-h-screen pt-6 bg-white shadow-sm w-20 md:w-64">
      {/* Dashboard */}
      <NavLink
        end
        to="/user"
        className={({ isActive }) =>
          `${linkStyle} ${isActive ? activeStyle : "text-gray-700"}`
        }
      >
        <img src={homeicon} alt="Dashboard" className="min-w-4 w-5" />
        <p className="hidden md:inline-block">Dashboard</p>
      </NavLink>

      {/* Add Blogs */}
      <NavLink
        to="/user/addblog"
        className={({ isActive }) =>
          `${linkStyle} ${isActive ? activeStyle : "text-gray-700"}`
        }
      >
        <img src={plusicon} alt="Add Blog" className="min-w-4 w-5" />
        <p className="hidden md:inline-block">Add Blogs</p>
      </NavLink>

      {/* Blog List */}
      <NavLink
        to="/user/listBlog"
        className={({ isActive }) =>
          `${linkStyle} ${isActive ? activeStyle : "text-gray-700"}`
        }
      >
        <img src={listicon} alt="Blog List" className="min-w-4 w-5" />
        <p className="hidden md:inline-block">Blog List</p>
      </NavLink>

      {/* Comments */}
      <NavLink
        to="/user/comments"
        className={({ isActive }) =>
          `${linkStyle} ${isActive ? activeStyle : "text-gray-700"}`
        }
      >
        <img src={commenticon} alt="Comments" className="min-w-4 w-5" />
        <p className="hidden md:inline-block">Comments</p>
      </NavLink>
    </div>
  );
}
