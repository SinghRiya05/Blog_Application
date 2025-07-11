import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {toast} from "react-toastify"

import axios from '../../../api/axios'

export default function EditBlog() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    subTitle: '',
    category: '',
    description: '',
    isPublished: false,
  });

  const [image, setImage] = useState(null);

  
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`blog/admin/${id}`);
        const blog = res.data.data;
        setFormData({
          title: blog.title,
          subTitle: blog.subTitle,
          category: blog.category,
          description: blog.description,
          isPublished: blog.isPublished,
        });
      } catch (err) {
        console.error('Failed to load blog:', err);
      }
    };
    fetchBlog();
  }, [id]);

  // 🟢 Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append('title', formData.title);
      data.append('subTitle', formData.subTitle);
      data.append('category', formData.category);
      data.append('description', formData.description);
      data.append('isPublished', formData.isPublished);
      if (image) {
        data.append('image', image);
      }

      await axios.put(`/blog/admin/${id}`, data);
      toast.success('Blog updated successfully!');
      navigate('/admin/listBlog'); 
      toast.success("Blog updated successfully")
    } catch (err) {
      toast.error("Updation failed")
      console.error('Update failed:', err);
    }
   
  };

  return (

    
    <div className="flex justify-center items-center min-h-screen w-full">
      
      <form onSubmit={handleSubmit} className="bg-white w-full  p-6 sm:p-10 m-4 sm:m-10 shadow-lg rounded-lg space-y-6">

      <h2 className="text-2xl font-bold text-gray-800 mb-4">Edit Blog</h2>

        <div>
            <label className="block text-gray-700 font-semibold mb-1">Blog Title</label>
        <input
          type="text"
          placeholder="Title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
           className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
      
          required
        /></div>
        <div>
              <label className="block text-gray-700 font-semibold mb-1">Sub Title</label>
        <input
          type="text"
          placeholder="SubTitle"
          value={formData.subTitle}
          onChange={(e) => setFormData({ ...formData, subTitle: e.target.value })}
           className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
      
        /></div>
        <div>
            <label className="block text-gray-700 font-semibold mb-1">Blog Category</label>
        <input
          type="text"
          placeholder="Category"
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          className="border p-2"
        /></div>
        <div>
        <textarea
          placeholder="Description"
          value={formData.description}
          rows="15"
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
           className="w-full border border-gray-300 rounded px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
        /></div>
        <div>
            <label htmlFor="image" className="block text-gray-700 font-semibold mb-1">Upload Thumbnail</label>
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          className="border p-2"
        /></div>

        
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={formData.isPublished}
            onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
          />
          Publish now
        </label>
        <button type="submit" className="bg-[#352f44] w-full text-white py-2 rounded">
          Update Blog
        </button>
      </form>
    </div>
  );
}
