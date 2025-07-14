import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import axios from "../../../api/axios";

export default function UserEditBlog() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    id: "",
    title: '',
    subTitle: '',
    category: '',
    description: '',
    isPublished: false,
  });

  const [image, setImage] = useState(null);
  const [categories, setCategories] = useState([]);

  // Fetch categories and blog data on mount
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`blog/slug/${slug}`);
        const blog = res.data.data;
        setFormData({
          id: blog._id,
          title: blog.title,
          subTitle: blog.subTitle,
          category: blog.category._id, // store the category ID
          description: blog.description,
          isPublished: blog.isPublished,
        });
      } catch (err) {
        console.error('Failed to load blog:', err);
      }
    };

    const fetchCategories = async () => {
      try {
        const res = await axios.get("/category");
        setCategories(res.data.data); 
      } catch (err) {
        console.error("Failed to load categories:", err);
      }
    };

    fetchBlog();
    fetchCategories();
  }, [slug]);

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

      await axios.put(`/blog/user/${formData.id}`, data);
      toast.success("Blog updated successfully");
      navigate('/user/listBlog');
    } catch (err) {
      toast.error("Updation failed");
      console.error('Update failed:', err);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen w-full">
      <form onSubmit={handleSubmit} className="bg-white w-full p-6 sm:p-10 m-4 sm:m-10 shadow-lg rounded-lg space-y-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Edit Blog</h2>

        {/* Title */}
        <div>
          <label className="block text-gray-700 font-semibold mb-1">Blog Title</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        {/* SubTitle */}
        <div>
          <label className="block text-gray-700 font-semibold mb-1">Sub Title</label>
          <input
            type="text"
            value={formData.subTitle}
            onChange={(e) => setFormData({ ...formData, subTitle: e.target.value })}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-gray-700 font-semibold mb-1">Blog Category</label>
          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          >
            <option value="" disabled>Select category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Description */}
        <div>
          <textarea
            placeholder="Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows="10"
            className="w-full border border-gray-300 rounded px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Image */}
        <div>
          <label className="block text-gray-700 font-semibold mb-1">Upload Thumbnail</label>
          <input
            type="file"
            accept='image/*'
            onChange={(e) => setImage(e.target.files[0])}
            className="border p-2"
          />

          {image && (
    <div className="mt-4">
      <p className="text-gray-600 text-sm mb-1">Preview:</p>
      <img
        src={URL.createObjectURL(image)}
        alt="Preview"
        className="max-w-xs max-h-60 rounded border"
      />
    </div>
  )}
        </div>

        {/* Publish */}
        <label className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={formData.isPublished}
            onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
          />
          Publish now
        </label>

        {/* Submit */}
        <button type="submit" className="bg-[#352f44] text-white py-2 px-5 w-full rounded">
          Update Blog
        </button>
      </form>
    </div>
  );
}
