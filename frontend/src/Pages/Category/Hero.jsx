import React, { useEffect, useState } from 'react'
import CatCard from './CatPages/CatCard'
import axios from '../../api/axios'
import Loader from '../../components/Loader'
export default function Hero() {
  const [categories,setCategories]=useState([])
  const [loader,setLoader]=useState(false)
 const fetchAllCategories=async()=>{
 try {
  setLoader(true)
   const res=await axios.get("category/all")
   setLoader(false)
   setCategories(res.data.data)
   
   
 } catch (error) {
  console.log(error);
  setLoader(false)
 }
 }

useEffect(()=>{
  fetchAllCategories()
},[])

if(loader){
  return <Loader/>
}
 

  return (
  <div  style={{background:"linear-gradient(115deg, #ffffff, #d4dfed)"}}>
    <div className='flex flex-col justify-center items-center gap-10 w-full  my-10 mx-auto'>
    {categories.map((cat)=>(
     <CatCard key={cat._id} cat={cat}/>
    )
  )}
  </div>
   
    </div>
  )
}
