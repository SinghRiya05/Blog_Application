import React from 'react'
import SmallCard from '../SmallCard'
import { useState } from 'react'
import axios from "../../../api/axios"
import { useEffect } from 'react';

export default function UserDashboard() {
const [Count,setCount]=useState("0");
const [draft,setDraft]=useState("0");

const fetchUserBlogCount=async()=>{
  try {
   const res=await axios.get("blog/user/count");
   console.log(res.data);
   
    setCount(res.data.data)
  } catch (error) {
    console.log(error.message);
    
  }
}

const fetchDraftBlog=async()=>{
  try {
   const res=await axios.get("blog/user/draft");
   console.log(res.data);
   
    setDraft(res.data.data)
  } catch (error) {
    console.log(error.message);
    
  }
}

useEffect(()=>{
 fetchDraftBlog();
 fetchUserBlogCount()
},[])


  return (
    <div>
     <div className='flex justify-around flex-wrap w-full '>
      <SmallCard content={"Total Blogs"} num={Count}/>
      <SmallCard content={"Drafts"} num={draft}/>
     
     </div>
     
    </div>
  )
}
