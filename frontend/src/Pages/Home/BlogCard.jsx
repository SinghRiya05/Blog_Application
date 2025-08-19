import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Calendar,User  } from "lucide-react";
export default function BlogCard({blog}) {
const {title,subTitle,category,image,_id,createdAt,slug,author}=blog;
const navigate=useNavigate();


  return (

  <div 
  onClick={() => navigate(`/blog/${slug}`)} 
  className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl hover:scale-[1.02] hover:-translate-y-1 transition-transform duration-300 cursor-pointer w-full mb-10"
>
  <img src={image} alt={title} className="w-full h-56 object-cover" />

  <div className="p-5 text-left bg-gray-50">
    <h2 className="text-xl font-semibold mb-2 text-[#352f44]">{title}</h2>
    <p className="text-gray-600 mb-4 text-sm">
      {subTitle}...{" "}
      <span className="text-base font-medium hover:underline text-blue-900">
        Read more
      </span>
    </p>
    
<div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-gray-500 font-medium">
  {/* Category */}
  <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full">
    {category?.name || "No Category"}
  </span>

  {/* Author */}
  <span className="flex items-center gap-1">
    <User className="w-4 h-4" />
    {author?.username || "Unknown Author"}
  </span>

  {/* Created Date */}
  <span className="flex items-center gap-1">
    <Calendar className="w-4 h-4" />
    {new Date(createdAt).toDateString()}
  </span>
</div>


  </div>
</div>


  )
}
