import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function CatCard({ cat }) {
  const navigate = useNavigate();

  return (
    <div className="border rounded-xl shadow-md text-center bg-white hover:shadow-lg  duration-300 hover:scale-105 transition-all"  onClick={() => navigate(`/categories/${cat.slug}`)}>
      {/* Title */}
      <h1 className="text-2xl font-semibold bg-blue-950 text-white  py-2 rounded-t-xl">
        {cat.name}
      </h1>

      {/* Description */}
      <p className="m-5 text-gray-600 line-clamp-3 cursor-pointer">
        {truncateText(cat.description,10)}
      </p>

     
    </div>
  );
}

function truncateText(text, wordLimit) {
  const words = text.split(" ");
  if (words.length <= wordLimit) return text;
  return words.slice(0, wordLimit).join(" ") + "...";
}