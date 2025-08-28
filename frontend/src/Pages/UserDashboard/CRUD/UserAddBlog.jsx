import React, { useState, useEffect } from "react";
import axios from "../../../api/axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Loader from "../../../components/Loader";

export default function UserAddBlog() {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [selectCategory, setSelectCategory] = useState("");
  const [description, setDescription] = useState("");
  const [isPublished, setIsPublished] = useState(false);
  const [loader, setLoader] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("image", image);
    formData.append("subTitle", subTitle);
    formData.append("description", description);
    formData.append("category", selectCategory);
    formData.append("isPublished", isPublished);

    try {
      await axios.post("/blog", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("✅ Blog created successfully!");
      navigate("/user/listBlog");
    } catch (error) {
      console.error(error.message);
      toast.error("❌ Failed to create blog");
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("category");
        setCategories(res.data.data);
      } catch (error) {
        console.error("Failed to fetch categories", error);
      }
    };
    fetchCategories();
  }, []);

  if (loader) {
    return (
      <div className="w-full text-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="flex justify-center items-start min-h-screen py-10 w-full bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-4xl p-6 sm:p-10 shadow-lg rounded-xl space-y-6"
      >
        <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-3">
          ✍️ Create a New Blog
        </h2>

        {/* Thumbnail Upload */}
        <div>
          <label
            htmlFor="image"
            className="block text-gray-700 font-semibold mb-2"
          >
            Upload Thumbnail
          </label>
          <input
            type="file"
            id="image"
            accept="image/*"
            required
            className="w-full border border-gray-300 rounded px-3 py-2 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            onChange={(e) => setImage(e.target.files[0])}
          />
          {image && (
            <div className="mt-4">
              <p className="text-gray-600 text-sm mb-2">Preview:</p>
              <img
                src={URL.createObjectURL(image)}
                alt="Preview"
                className="max-w-sm max-h-40 rounded-lg border shadow"
              />
            </div>
          )}
        </div>

        {/* Blog Title */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Blog Title
          </label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter blog title"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Sub Title */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Sub Title
          </label>
          <input
            type="text"
            value={subTitle}
            onChange={(e) => setSubTitle(e.target.value)}
            placeholder="Enter sub title"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Blog Description
          </label>
          <textarea
            rows="12"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Write your blog content here..."
            className="w-full border border-gray-300 rounded px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>

        {/* Category */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Blog Category
          </label>
          <select
            value={selectCategory}
            onChange={(e) => setSelectCategory(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="" disabled>
              Select category
            </option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Publish Checkbox */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="isPublished"
            checked={isPublished}
            onChange={(e) => setIsPublished(e.target.checked)}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="isPublished" className="text-gray-700 font-medium">
            Publish this blog?
          </label>
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            className="w-full bg-blue-900 hover:bg-blue-800 text-white font-semibold py-2.5 px-4 rounded-lg shadow transition transform hover:scale-[1.02]"
          >
            🚀 Add Blog
          </button>
        </div>
      </form>
    </div>
  );
}
