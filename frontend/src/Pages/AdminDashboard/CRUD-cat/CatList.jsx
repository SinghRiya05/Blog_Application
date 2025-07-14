import React, { useEffect, useState } from "react";
import axios from "../../../api/axios";
import deleteicon from "../../../assets/bin_icon.svg";
import { useNavigate } from "react-router-dom";
import {toast} from "react-toastify"

export default function CatList() {
  const [Categories, setCategories] = useState([]);
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    try {
      await axios.delete(`category/${id}`);
      toast.success("Category is deletd")
      setCategories((prev) => prev.filter((categiries) => categiries._id !== id));
    } catch (error) {
       toast.success("Blog deltetion failed")
      console.log(error.message);
    }
  };

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await axios.get(`category`);
        console.log(response.data.data);
        
        setCategories(response.data.data);
      } catch (error) {
        console.error("Error fetching categiries:", error);
      }
    };
    fetchCategory();
  }, []);

  return (
    <div className="w-full  p-4">
      <h2 className="text-xl font-semibold mb-4">All Categories</h2>
      <table className="w-full border-collapse border bg-white">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Date</th>
            <th className="border px-4 py-2">Delete</th>
            <th className="border px-4 py-2">Update</th>
          </tr>
        </thead>
        <tbody>
          {Categories.map((category) => (
            <tr key={category._id} className="text-center">
              <td className="border px-4 py-2">{category.name}</td>
              <td className="border px-4 py-2">
                {new Date(category.createdAt).toLocaleDateString()}
              </td>

              <td className="border px-4 py-2 ">
                <button
                  onClick={() => handleDelete(category._id)}
                  className="cursor-pointer"
                >
                  <img src={deleteicon} width={20} alt="" />
                </button>
              </td>
              <td className="border px-4 py-2 ">
                <button
                  onClick={() => navigate(`/admin/updateCategory/${category._id}`)}
                  className="cursor-pointer text-blue-800 underline hover:text-blue-400"
                >
                  Edit Category
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
