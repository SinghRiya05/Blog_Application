import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../../api/axios';
import deleteicon from "../../../assets/bin_icon.svg"
import {toast} from "react-toastify"
export default function UserBloglist() {
const navigate=useNavigate()

  const [blogs, setBlogs] = useState([]);
   const handleDelete=async(id)=>{
    try {
      const res=await axios.delete(`/blog/${id}`)
      toast.success("Blog deleted Succesfully")
        setBlogs(prevBlogs => prevBlogs.filter(blog => blog._id !== id));
    } catch (error) {
     toast.error("Deletion failed")
      console.log(error);
      
    }
   }
  useEffect(() => {
    const fetchUserBlogs = async () => {
      try {
        const response = await axios.get(`/blog/AllUserBlog`,{ headers:{
             Authorization: `Bearer ${localStorage.getItem("token")}`
        }
        });
        setBlogs(response.data.data);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };

    fetchUserBlogs();
  }, []);
   if (!blogs || blogs.length === 0) {
  return (<div className=' flex justify-center mt-10 text-center w-full'><p className='text-xl'>Blogs are Empty!</p></div>);
}


   return (
    <div className='w-full  p-4'>
      <h2 className="text-xl font-semibold mb-4">My Blogs</h2>
      <table className='w-full border-collapse border bg-white'>
        <thead>
          <tr className='bg-gray-200'>
            <th className='border px-4 py-2'>Title</th>
            <th className='border px-4 py-2'>Date</th>
            <th className='border px-4 py-2'>Status</th>
            <th className='border px-4 py-2'>Delete</th>
            <th className='border px-4 py-2'>Update</th>
          </tr>
        </thead>
        <tbody>
          {blogs.map(blog => (
            <tr key={blog._id} className='text-center'>
              <td className='border px-4 py-2'>{blog.title}</td>
              
              <td className='border px-4 py-2'>{new Date(blog.createdAt).toLocaleDateString()}</td>
              <td className='border px-4 py-2'>{blog.status || 'Published'}</td>
              <td className='border px-4 py-2 '><button onClick={()=>handleDelete(blog._id)} className='cursor-pointer'><img  src={deleteicon} width={20} alt="" /></button></td>
              <td className='border px-4 py-2 '><button onClick={()=>navigate(`/user/editBlog/${blog.slug}`)} className='cursor-pointer text-blue-800 underline hover:text-blue-400'>Edit Blog</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
  
}
