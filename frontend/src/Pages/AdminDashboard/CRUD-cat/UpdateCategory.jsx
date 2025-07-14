import React, { useEffect, useState } from "react";
import axios from "../../../api/axios";
// import { toast } from "react-toastify";
import {useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";


export default function UpdateCategory() {
    const navigate=useNavigate()
  const [formData, setFormData] = useState({ name: "", description: "" });
const {id}=useParams();


useEffect(()=>{
const fetchExistingData=async(id)=>{
    try {
        const res=await axios.get(`category/${id}`)
         const category=res.data.data;
         setFormData({
            name:category.name || " ",
            description:category.description||" "
         })
    } catch (error) {
          console.error("Failed to fetch category", error);
      toast.error("Failed to load category data.");
    }
     
}

fetchExistingData(id)
},[id])

const handleSubmit=async(e)=>{
e.preventDefault();
   try {
     const res =await axios.put(`category/${id}`,{
         name:formData.name,
         description:formData.description
     })
     toast.success("Category Updated Successfully ")
     navigate("/admin/categorylist")
     
   } catch (error) {
    toast.error(error.response.data.message)
    console.log(error);
    
   }
}




  return (
    <div className=" mx-auto mt-16 border border-gray-300 shadow-lg rounded-2xl p-6 bg-white max-w-xl md:w-1/2">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
       Update Category
      </h2>

      <form className="flex flex-col space-y-5" onSubmit={handleSubmit} >
        {/* Category Name */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Category Name:
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            id="name"
            placeholder="Enter category name"
            required
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-200"
          />
        </div>

        {/* Category Description */}
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Description:
          </label>
          <textarea
            id="description"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            placeholder="Enter category description"
            required
            rows="4"
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-200"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-[#352f44] text-white py-2 rounded-md hover:bg-[#352f70] transition duration-200"
        >
         Update Category
        </button>
      </form>
    </div>
  );
}
