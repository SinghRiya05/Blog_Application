import React, { useEffect, useState } from 'react';
import axios from '../../api/axios';
import deleteicon from "../../assets/bin_icon.svg"
export default function UserBloglist() {
  const [blogs, setBlogs] = useState([]);
   const handleDelete=async(id)=>{
    try {
      const res=axios.delete(`/blog/${id}`)
      alert((await res).data.message);
        setBlogs(prevBlogs => prevBlogs.filter(blog => blog._id !== id));
    } catch (error) {
      console.log(error.message);
      
    }
   }
  useEffect(() => {
    const fetchUserBlogs = async () => {
      try {
    
        const response = await axios.get(`/blog/AllUserBlog`, {
             Authorization: `Bearer ${localStorage.getItem("token")}`
        });
        setBlogs(response.data.data);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };

    fetchUserBlogs();
  }, []);

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
          </tr>
        </thead>
        <tbody>
          {blogs.map(blog => (
            <tr key={blog._id} className='text-center'>
              <td className='border px-4 py-2'>{blog.title}</td>
              <td className='border px-4 py-2'>{new Date(blog.createdAt).toLocaleDateString()}</td>
              <td className='border px-4 py-2'>{blog.status || 'Published'}</td>
              <td className='border px-4 py-2 '><button onClick={()=>handleDelete(blog._id)} className='cursor-pointer'><img  src={deleteicon} width={20} alt="" /></button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
