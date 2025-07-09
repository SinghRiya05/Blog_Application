import React from 'react'
import SmallCard from './SmallCard'

export default function UserDashboard() {
  return (
    <div>
     <div className='flex justify-around flex-wrap w-full '>
      <SmallCard title={"Total Blogs"} content={" 10"}/>
      <SmallCard title={"Total Blogs"} content={" 10"}/>
      <SmallCard title={"Total Blogs"} content={" 10"}/>
      <SmallCard title={"Total Blogs"} content={" 10"}/>
     </div>
     
    </div>
  )
}
