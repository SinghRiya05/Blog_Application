import React from 'react'
import logo from "../../../assets/blog-logo.svg";
import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import {toast} from "react-toastify"

export default function Layout() {
const navigate=useNavigate()
const logout=()=>{
  localStorage.removeItem("token")
  toast.success("User logged out successfully")
    navigate("/")
}

  return (
   <>
   <div className='border border-gray-100 shadow-sm flex justify-between'>
   <div className='flex items-center lg:mx-5 p-3 cursor-pointer '>
    <img src={logo} alt="" width={50} onClick={()=>navigate("/")} className=''/>
     <p className='text-lg font-semibold ml-4'> MyBlogSpace</p>
   </div>
   <button onClick={logout}
               className=" h-12  px-5 py-2 mt-3 mr-5 lg:mr-16 border-none text-white rounded-xl lg:text-base sm:text-sm cursor-pointer"
               style={{ backgroundColor: '#352f44' }}
             >
              Logout
               
             </button>
   </div>
   <div className='flex h-[calc(100vh -70px)]'>
      <Sidebar/>
    <Outlet/>
   </div>
   </>
  )
}
