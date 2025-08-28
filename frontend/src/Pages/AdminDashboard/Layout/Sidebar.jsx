import React from "react";
import { NavLink } from "react-router-dom";
import homeicon from "../../../assets/home_icon.svg";
import plusicon from "../../../assets/add_icon.svg";
import listicon from "../../../assets/list_icon.svg";
import commenticon from "../../../assets/comment_icon.svg";
import list from "../../../assets/rectangle-list-regular.svg";
import addCategory from "../../../assets/square-plus-regular.svg";

export default function Sidebar() {
  const links = [
    { to: "/admin", label: "Dashboard", icon: homeicon },
    { to: "/admin/addblog", label: "Add Blogs", icon: plusicon },
    { to: "/admin/listBlog", label: "Blog List", icon: listicon },
    { to: "/admin/comments", label: "Comments", icon: commenticon },
    { to: "/admin/category", label: "Add Category", icon: addCategory },
    { to: "/admin/categorylist", label: "Category List", icon: list },
    { to: "/admin/userlist", label: "User List", icon: list },
  ];

  return (
    <div className="flex flex-col bg-gray-50 border-r border-gray-200 min-h-screen w-20 md:w-64 p-4 shadow-md">
      <h2 className="text-xl font-bold text-gray-700 mb-6 hidden md:block">
        Admin Panel
      </h2>

      {links.map((link) => (
        <NavLink
          key={link.to}
          end={true}
          to={link.to}
          className={({ isActive }) =>
            `flex items-center gap-4 py-3 px-3 md:px-5 rounded-lg cursor-pointer transition-all duration-300 ${
              isActive
                ? "bg-blue-100 text-blue-700 border-r-4 border-blue-500"
                : "text-gray-600 hover:bg-gray-100 hover:text-gray-800"
            }`
          }
        >
          <div className="flex items-center justify-center w-10 h-10 rounded-full ">
            <img src={link.icon} alt="" className="w-5" />
          </div>
          <p className="hidden md:inline-block font-medium">{link.label}</p>
        </NavLink>
      ))}
    </div>
  );
}
