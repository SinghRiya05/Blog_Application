import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function BlogCard({blog}) {
const {title,subTitle,category,image,_id,slug}=blog;
const naviagte=useNavigate();


  return (

     <div onClick={()=>{naviagte(`blog/${slug}`)}} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl hover:scale-[1.02] transition-transform duration-300 cursor-pointer w-80">
      <img src={image} alt={"img"} className="w-full h-48 object-cover" />
      <span className='ml-5 mt-4 px-3 py-1 inline-block rounded-full text-#352f44 bg-[#9b9a9c]'>{category}</span>
      <div className="p-5 text-left">
        <h2 className="text-xl font-semibold mb-2 text-[#352f44]">{title}</h2>
        <p className="text-gray-600 mb-4 text-sm" >{subTitle}</p>
        
      </div>
    </div>
  )
}
