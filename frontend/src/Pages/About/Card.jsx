import React from 'react'

export default function Card({icon,title,description}) {
  return (
     <div className="w-[20rem] my-5 mx-auto bg-white shadow-lg rounded-2xl p-6 border hover:scale-105 duration-300 transition-all">
      
      <h3 className="text-xl font-bold   text-gray-800 mb-4">{title}</h3>
      <hr />
      <p className="text-gray-600 text-sm mt-2">
       {description}
      </p>
    </div>
  )
}
