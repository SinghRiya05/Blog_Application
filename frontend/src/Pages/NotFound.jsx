// src/pages/NotFound.jsx
import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-5xl font-bold text-red-600">404</h1>
      <p className="text-xl mt-4 text-gray-700">Page Not Found</p>
      <Link to="/" className="mt-6 text-blue-500 underline">Go to Homepage</Link>
    </div>
  )
}
