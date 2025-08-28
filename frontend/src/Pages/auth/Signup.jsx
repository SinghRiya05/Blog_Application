import React, { useState } from 'react';
import axios from "../../api/axios";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import Footer from "../../components/Footer/Footer";

export default function Signup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        '/user/register',
        { username, email, password },
        { withCredentials: true }
      );
      toast.success("User Registered 🎉");
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Signup failed");
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-950 to-black px-4">
        
        {/* Glass Card */}
        <div className="backdrop-blur-xl bg-white/10 p-8 rounded-2xl shadow-2xl w-full max-w-md border border-white/20 hover:scale-105 transition-transform duration-500">
          
          {/* Title */}
          <h2 className="text-3xl font-bold mb-6 text-center text-white tracking-wide">
            Create Your Account 🚀
          </h2>
          
          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-5 text-white">
            
            {/* Username */}
            <div>
              <label htmlFor="username" className="block text-sm mb-1 font-medium">
                Username
              </label>
              <input
                className="w-full p-3 rounded-xl border border-white/30 bg-white/20 text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-white"
                type="text"
                id="username"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm mb-1 font-medium">
                Email
              </label>
              <input
                className="w-full p-3 rounded-xl border border-white/30 bg-white/20 text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-white"
                type="email"
                id="email"
                placeholder="example@mail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm mb-1 font-medium">
                Password
              </label>
              <input
                className="w-full p-3 rounded-xl border border-white/30 bg-white/20 text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-white"
                type="password"
                id="password"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* Signup Button */}
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-white text-gray-900 font-bold hover:bg-blue-200 transition-all duration-300 shadow-lg"
            >
              Sign Up
            </button>

            {/* Redirect to Login */}
            <p className="text-center text-sm mt-4 text-gray-200">
              Already have an account?{" "}
              <span
                onClick={() => navigate("/login")}
                className="text-blue-300 font-semibold cursor-pointer hover:underline"
              >
                Login
              </span>
            </p>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}
