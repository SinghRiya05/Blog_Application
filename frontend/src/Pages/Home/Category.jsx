import React, { useEffect, useState } from "react";
import axios from "../../api/axios";
import CatCard from "../../components/CatCard";
import { motion, AnimatePresence } from "framer-motion";

function Category() {
  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    try {
      const res = await axios.get("category/all");
      

      // Safe handling: agar array direct mila to use le lo, warna nested data lo
      const cats = Array.isArray(res.data)
        ? res.data
        : res.data?.data || [];

      setCategories(cats);
    } catch (error) {
      console.error("Error fetching categories:", error);
      setCategories([]); // fallback
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="px-6 py-12 md:px-20 bg-gray-50 ">
      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold mb-6 text-center text-gray-800"
      >
        Explore Categories
      </motion.h2>
      <p className="text-center text-gray-600 mb-12 text-lg">
        Discover blogs across different topics and interests
      </p>

      {/* Categories Grid */}
      {categories.length > 0 ? (
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"
        >
          <AnimatePresence>
            {categories.map((cat, index) => (
              <motion.div
                key={cat._id || index} // fallback key
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1, // staggered effect
                }}
                whileHover={{ scale: 1.05 }}
                className="transform transition"
              >
                <CatCard cat={cat} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-gray-500 text-xl mt-10"
        >
          🚫 No categories available
        </motion.div>
      )}
    </div>
  );
}

export default Category;
