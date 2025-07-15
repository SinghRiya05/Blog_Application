import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function CatCard({cat}) {
    const navigate=useNavigate();
  return (
    
      <div className='border-2 text-center w-1/2  my-5 leading-relaxed bg-white'>
        <h1 className='text-2xl bg-slate-400 py-2'>
            {cat.name}
        </h1>
        <p className='m-5'>{cat.description}</p>
        <button className='mb-5 hover:underline bg-blue-950 text-white px-3 py-1 rounded-xl' onClick={()=>navigate(`/categories/${cat.slug}`)}>Click to show blogs</button>
      </div>
   
  )
}
