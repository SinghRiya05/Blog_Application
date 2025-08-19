import React, { useEffect, useState } from 'react'
import axios from "../../../api/axios"
function UserList() {
 const [users,setUsers]=useState([]);

useEffect(()=>{
    (
        async()=>{
           try {
             const res=await axios.get("user");
             setUsers(res.data.data)
             console.log(res.data.data);
             
           } catch (error) {
            console.log(error);
            
           }
        }
    )()
},[])

  return (
    
   <div className="w-full  p-4">
        <h2 className="text-xl font-semibold mb-4">All Blogs</h2>
        <table className="w-full border-collapse border bg-white">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2">Username</th>
              <th className="border px-4 py-2">E-mail</th>
            
              <th className="border px-4 py-2">Date</th>
            
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="text-center">
                <td className="border px-4 py-2">{user.username}</td>
                <td className="border px-4 py-2">
                  {user.email}
                </td>
                <td className="border px-4 py-2">
                  {new Date (user.createdAt).toDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
  )
}

export default UserList
