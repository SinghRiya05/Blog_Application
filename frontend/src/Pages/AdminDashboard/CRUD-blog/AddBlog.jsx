import React, { useState,useEffect} from 'react'
import axios from "../../../api/axios"
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import Loader from '../../../components/Loader';
import TextEditor from "../../../components/TextEditor"
export default function AddBlog() {
   const navigate = useNavigate();
  const [categories, setCategories] = useState([]);  
 const [image,setImage]=useState(null);
 const [title,setTitle]=useState("");
 const [subTitle,setSubTitle]=useState("");
 const [selectCategory, setSelectCategory] = useState("");
 const [description,setDescription]=useState("");
 const [isPublished, setIsPublished] = useState(false);
  const [loader, setLoader] = useState(false);
  
const handleSubmit=async(e)=>{
   e.preventDefault();
   const formData=new FormData();
    setLoader(true);
   formData.append("title",title);
   formData.append("image",image);
   formData.append("subTitle",subTitle);
   formData.append("description",description);
   formData.append("category",selectCategory);
   formData.append("isPublished",isPublished);

try {
  const res=await axios.post("/blog",formData,{
    headers: {
        "Content-Type": "multipart/form-data",
      },
  })
  setLoader(false);
  toast.success("Blog created successfully")
  console.log("Blog is created : ",res.data);
   navigate("/admin/listBlog");
  
} catch (error) {
  console.log(error.message);
  toast.error("Failed")
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
      <div className="w-full text-center ">
        <Loader />
      </div>
    );
  }

  return (
   <div className="flex justify-center items-center min-h-screen w-full">
  <form className="bg-white w-full  p-6 sm:p-10 m-4 sm:m-10 shadow-lg rounded-lg space-y-6">
    
    <h2 className="text-2xl font-bold text-gray-800 mb-4">Create a New Blog</h2>

    {/* Thumbnail Upload */}
    <div >
      <label htmlFor="image" className="block text-gray-700 font-semibold mb-1">Upload Thumbnail</label>
      <input
        type="file"
        id="image"
        className="w-full border border-gray-300 rounded px-3 py-2"
        onChange={(e)=>setImage(e.target.files[0])}
      />
    </div>

    {/* Blog Title */}
    <div>
      <label className="block text-gray-700 font-semibold mb-1">Blog Title</label>
      <input
        type="text"
        value={title}
        onChange={(e)=>setTitle(e.target.value)}
        required
        placeholder="Enter blog title"
        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
    </div>

    {/* Sub Title */}
    <div>
      <label className="block text-gray-700 font-semibold mb-1">Sub Title</label>
      <input
        type="text"
        value={subTitle}
        onChange={(e)=>setSubTitle(e.target.value)}
        placeholder="Enter sub title"
        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
    </div>

    {/* Description */}
    <div>
      <label className="block text-gray-700 font-semibold mb-1">Blog Description</label>
      <TextEditor
        value={description}
        onChange={setDescription}
       
      />
    </div>

    {/* Category */}
    <div>
      <label className="block text-gray-700 font-semibold mb-1">Blog Category</label>
      <select
        name="category"
         value={selectCategory}
  onChange={(e) => setSelectCategory(e.target.value)}
        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        defaultValue=""
      >
        <option value="" disabled>Select category</option>
        {categories.map((cat)=>(
          <option key={cat._id} value={cat._id}>{cat.name}</option>
        ))}
      </select>
    </div>
    <div>
      <input type="checkbox" name="" id="isPublished" checked={isPublished} onChange={(e)=>setIsPublished(e.target.checked)} />
      <label htmlFor="isPublished" className="text-gray-700 font-semibold">
    Publish this blog?
  </label>
    </div>

    {/* Submit Button */}
    <div className="pt-4">
      <button
        type="submit"
        onClick={handleSubmit}
        className="w-full bg-[#352f44] hover:scale-105 text-white font-semibold py-2 px-4 rounded transition duration-300"
      >
        Add Blog
      </button>
    </div>
  </form>
</div>

  )
}
