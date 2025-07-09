import React, { useState, useEffect } from 'react';
import {  blogCategories } from '../../assets/assets';
import BlogCard from './BlogCard';

import axios from "../../api/axios"


export default function AllBlog() {

  const[blogs,setBlogs]=useState([]);
  const [selected, setSelected] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 6;

  // Filter blogs based on selected category
  const filteredBlogs = blogs.filter(
    (blog) => selected.toLowerCase() === "all" || blog.category.toLowerCase()=== selected.toLowerCase()
  );

  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);
  const startIndex = (currentPage - 1) * blogsPerPage;
  const endIndex = startIndex + blogsPerPage;
  const paginatedBlogs = filteredBlogs.slice(startIndex, endIndex);

  // Reset to page 1 when category changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selected]);

  useEffect(()=>{
    axios.get("/blog/AllBlog")
    .then((res)=>{
      setBlogs(res.data.data);
    })
     .catch((err) => {
        console.error(" Error fetching blogs:", err.message);
      });
  })

  return  (
    <div>
      {/* Category Buttons */}
      <div className='flex justify-center gap-4 sm:gap-8 my-10 flex-wrap'>
        {blogCategories.map((item) => (
          <button
            key={item}
            onClick={() => setSelected(item)}
            className={`
              text-base px-5 py-2 rounded-full transition-all duration-300 ease-in-out border 
              ${selected === item 
                ? 'bg-[#352f44] text-white border-[#352f44]' 
                : 'bg-white text-black border-gray-300'}
            `}
          >
            {item}
          </button>
        ))}
      </div>

      {/* Blog Cards */}
      <div className='flex flex-wrap justify-evenly gap-6 px-4 lg:mx-20 py-8'>
        {paginatedBlogs.length > 0 ? (
          paginatedBlogs.map((blog) => (
            <BlogCard key={blog._id} blog={blog} />
          ))
        ) : (
          <p className="text-center text-gray-500">No blogs found.</p>
        )}
      </div>

      {/* Pagination Controls */}
      {filteredBlogs.length > blogsPerPage && (
        <div className="flex justify-center mt-6 gap-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 border rounded disabled:opacity-50"
          >
            Prev
          </button>

          <span className="px-4 py-2 font-semibold">
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  )
}
