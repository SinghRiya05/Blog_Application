import React, { useEffect, useState } from 'react'
import axios from "../../../api/axios"
export default function Comment() {
const [comments,setComments]=useState([]);

useEffect(()=>{
  ;(
    async()=>{
      try {
         const token = localStorage.getItem("token");
        const res=await axios.get("http://localhost:8080/comment",{
           headers: {
          Authorization: `Bearer ${token}`, // ✅ send token
        },
        });
        setComments(res.data.data);
        console.log(res.data.data);
        
        
      } catch (error) {
        console.log(error);
        
      }
    }
  )()
},[])

  return (
    <div>
    {comments.map((field)=>(
      <div key={field._id}>{field.author.username}
      <p>{field.content}</p></div>
      
    ))}
    </div>
  )
}
