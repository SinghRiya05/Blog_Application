import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Last() {
  const navigate=useNavigate();
  return (
    <div className="bg-blue-950 mb-10 rounded-2xl mx-10 text-white text-center py-10 px-6">
  <h2 className="text-3xl md:text-4xl font-bold mb-4">
    Ready to Explore More?
  </h2>
  <p className="text-lg mb-8 text-gray-300">
    Join our community of readers & writers. Stay updated with fresh blogs.
  </p>
  <button onClick={()=>navigate("/user")} className="px-6 py-3 bg-white text-blue-950 font-semibold rounded-lg  transition">
    Get Started
  </button>
</div>

  )
}
