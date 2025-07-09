import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
export default function Signup() {
    const navigate=useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log('Signup form submitted:', { email, password ,username});
    try {
        await axios.post('/user/register', { email, password },{withCredentials:true}) 
        navigate("/user")
    } catch (error) {
        console.log(error.message);
        
    }
  };

  return (
    <div className='flex justify-center items-center mt-16'>
      <div className='border-2 border-black px-10 py-8 rounded-lg shadow-md w-full max-w-md'>
        <h2 className='text-2xl font-bold mb-6 text-center'>Sign Up</h2>
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
            type="submit"
            className='bg-[#352f44] text-white py-2 rounded hover:bg-[#2e293d] transition duration-300'
          >
            Signup
          </button>
          
        </form>
      </div>
    </div>
  );
}
