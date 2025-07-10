import React, { useState } from 'react';
import axios from "../../api/axios";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import Footer from "../../components/Footer/Footer"
export default function Signup() {
    const navigate=useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log('Signup form submitted:', { email, password ,username});
    try {
     const res= await axios.post('/user/register', { username,email, password },{withCredentials:true}) 
       toast.success("User Registered")
        navigate("/user")
    } catch (error) {
        
        toast.error(error.response?.data?.message)
    }
  };

  return (
    <>
    <Navbar/>
    <div className='flex justify-center items-center mt-16 mb-10'>
      <div className='border-2 border-black px-10 py-8 rounded-lg shadow-md w-full max-w-md  hover:scale-105 transition-all duration-700 hover:shadow-md hover:bg-gray-100'>
        <h2 className='text-2xl font-bold mb-6 text-center'>Sign Up</h2>
        <form  className='flex flex-col gap-4'>
          <div>
            <label htmlFor="email" className='block text-sm font-medium mb-1'>Email</label>
            <input
              className='w-full p-2 border border-gray-400 rounded outline-none'
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="username" className='block text-sm font-medium mb-1'>Username</label>
            <input
              className='w-full p-2 border border-gray-400 rounded outline-none'
              type="username"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="password" className='block text-sm font-medium mb-1'>Password</label>
            <input
              className='w-full p-2 border border-gray-400 rounded outline-none'
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            onClick={handleSubmit}
            className='bg-[#352f44] text-white py-2 rounded hover:scale-105 transition duration-300 mt-2'
          >
            Signup
          </button>
          <p className='text-lg italic'> Back to 
            <button className='font-bold underline cursor-pointer ml-2 ' onClick={()=>navigate("/login")}><span  >Login</span></button></p>
        </form>
      </div>
    </div>
    <Footer/>
    </>
  );
}
