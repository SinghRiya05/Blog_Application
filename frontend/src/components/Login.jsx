import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios/';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import Navbar from './Navbar';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/user/login', { email, password },
         { withCredentials: true } 
      )
  console.log(res.data.data);
  
      
      const token = res.data.data.token;

     

      if (token) {
        
        localStorage.setItem("token", token);
        
        const decoded = jwtDecode(token);
        const role = decoded.role;
        console.log(role);
        

       
        if (role === "admin") {
          window.location.href = "/admin";;
        } else if (role === "user") {
           window.location.href = "/user";
        } else {
          setErrorMsg("Unknown user role.");
        }
      } else {
        setErrorMsg("No token received.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrorMsg(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div>
    <Navbar/>
    <div className='flex justify-center items-center mt-16'>
      <div className='border-2 border-black px-10 py-8 rounded-lg shadow-md w-full max-w-md'>
        <h2 className='text-2xl font-bold mb-6 text-center'>Login</h2>
        {errorMsg && <p className="text-red-500 mb-4 text-center">{errorMsg}</p>}
        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
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
            type="submit"
            className='bg-[#352f44] text-white py-2 rounded hover:bg-[#2e293d] transition duration-300'
          >
            Login
          </button>
        </form>
        <p className='mt-8 italic'>
          Don't have an account?{' '}
          <span className='cursor-pointer font-bold' onClick={() => navigate("/signup")}>
            Signup now
          </span>
        </p>
      </div>
    </div>
    </div>
  );
}
