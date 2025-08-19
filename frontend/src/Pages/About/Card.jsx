import React from "react";
import { motion } from "framer-motion";

export default function Card({ icon, title, description }) {
  return (
    <motion.div
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true }}
      className="w-[20rem] my-5 mx-auto bg-white/80 backdrop-blur-lg shadow-lg rounded-2xl p-6 border border-gray-200 hover:shadow-xl transition-all duration-300"
    >
      {/* Icon */}
      {icon && (
        <div className="flex justify-center items-center w-14 h-14 bg-blue-100 text-blue-600 rounded-full mb-4 mx-auto shadow-md">
          {icon}
        </div>
      )}

      {/* Title */}
      <h3 className="text-xl font-bold text-gray-800 text-center mb-3">
        {title}
      </h3>
      <div className="w-16 h-1 bg-blue-500 mx-auto rounded mb-4"></div>

      {/* Description */}
      <p className="text-gray-600 text-sm text-center leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
}
