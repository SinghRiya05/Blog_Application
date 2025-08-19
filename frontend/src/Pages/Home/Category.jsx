import React, { useEffect, useState } from 'react';
import axios from '../../api/axios';
import CatCard from '../../components/CatCard';

function Category() {
  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    try {
      const res = await axios.get("category/all");
      setCategories(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="p-10 px-20">
      <h2 className="text-4xl font-bold mb-10 text-center">All Categories</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-12">
        {categories.map((cat) => (
          <CatCard key={cat._id} cat={cat} />
        ))}
      </div>
    </div>
  );
}

export default Category;
