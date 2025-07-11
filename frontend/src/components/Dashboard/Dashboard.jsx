import React from 'react'
import SmallCard from '../UserDashboard/SmallCard'
import { useState } from 'react'
import axios from "../../api/axios"
import { useEffect } from 'react';

export default function Dashboard() {
const [data,setData]=useState({totalBlogs:0,totalUsers:0});

const fetchData=async()=>{
 try {
  const res =await axios.get("blog/admin",{
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    });
  console.log(res.data);
  setData(res.data.data); 
 } catch (error) {
  console.log(error.message);
 }

};

useEffect(()=>{
  fetchData()
  
},[])

  return (
    <div>
     <div className='flex justify-around flex-wrap w-full '>
      <SmallCard num={data.totalBlogs} content={"Total Blogs"}/>
      <SmallCard num={data.totalUsers} content={"Total Users"}/>
      
     </div>
     
    </div>
  )
}
