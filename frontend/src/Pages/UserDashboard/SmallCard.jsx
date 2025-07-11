import React from 'react'

export default function SmallCard({num,content}) {
  return (
    <div className='mt-10 mx-5 w-64'>
      <div className='border-2   px-10 py-5 rounded-2xl shadow-md h-35 '>
        <p className='text-lg'>{num} </p>
        <p className='text-lg mt-3'>{content}</p>
      </div>
    </div>
  )
}
