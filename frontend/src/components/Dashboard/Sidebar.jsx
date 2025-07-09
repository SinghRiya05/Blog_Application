import React from 'react'
import { NavLink } from 'react-router-dom'
import homeicon from "../../assets/home_icon.svg"
import plusicon from "../../assets/add_icon.svg"
import listicon from "../../assets/list_icon.svg"
import commenticon from "../../assets/comment_icon.svg"

export default function Sidebar() {
  return (
    <div className='flex flex-col border-r border-gray-200 min-h-full pt-6'>
      <NavLink end={true} to="/admin" className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer ${isActive && "bg-slate-300 border-r-4 border-gray-500"} `}>
        <img src={homeicon} alt="" className='min-w-4 w-5'/>
        <p className='hidden md:inline-block'>DashBoard</p>
       
      </NavLink>
      
      <NavLink  to="/admin/addblog" className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer ${isActive && "bg-slate-300 border-r-4 border-gray-500"} `}>
        <img src={plusicon} alt="" className='min-w-4 w-5'/>
        <p className='hidden md:inline-block'>Add Blogs</p>
       
      </NavLink>
      <NavLink to="/admin/listBlog" className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer ${isActive && "bg-slate-300 border-r-4 border-gray-500"} `}>
        <img src={listicon} alt="" className='min-w-4 w-5'/>
        <p className='hidden md:inline-block'>Blog List</p>
       
      </NavLink>

      <NavLink  to="/admin/comments" className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer ${isActive && "bg-slate-300 border-r-4 border-gray-500"} `}>
        <img src={commenticon} alt="" className='min-w-4 w-5'/>
        <p className='hidden md:inline-block'>Comments</p>
       
      </NavLink>
    </div>
  )
}
