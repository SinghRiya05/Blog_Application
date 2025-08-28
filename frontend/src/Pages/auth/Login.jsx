import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import { jwtDecode } from "jwt-decode";
import Navbar from "../../components/Navbar/Navbar";
import { toast } from "react-toastify";
import Footer from "../../components/Footer/Footer";

export default function Login({ setRole }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "/user/login",
        { email, password },
        { withCredentials: true }
      );

      const token = res.data.data.token;

      if (token) {
        localStorage.setItem("token", token);

        const decoded = jwtDecode(token);
        const role = decoded.role;
        setRole(role);

        if (role === "admin" || role === "user") {
          navigate("/");
        } else {
          setErrorMsg("Unknown user role.");
        }
      } else {
        setErrorMsg("No token received.");
      }
      toast.success("User Logged in successfully");
    } catch (error) {
      setErrorMsg(error.response?.data?.message || "Login failed");
      toast.error(errorMsg);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      {/* Background Gradient */}
      <div className="flex-1  flex items-center justify-center bg-gradient-to-br from-blue-900 via-gray-900 to-black px-4">
        {/* Glassmorphism Card */}
        <div className="relative my-20 bg-white/10 backdrop-blur-lg border border-white/20 px-10 py-10 rounded-2xl shadow-2xl w-full max-w-md text-white transition-all duration-700 hover:scale-[1.02]">
          <h2 className="text-3xl font-bold mb-8 text-center tracking-wide">
            Welcome Back 👋
          </h2>

          {errorMsg && (
            <p className="text-red-400 mb-4 text-center">{errorMsg}</p>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email Address
              </label>
              <input
                className="w-full p-3 rounded-xl bg-white/10 border border-gray-500 focus:border-blue-400 outline-none text-white placeholder-gray-300"
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter your email"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium mb-2"
              >
                Password
              </label>
              <input
                className="w-full p-3 rounded-xl bg-white/10 border border-gray-500 focus:border-blue-400 outline-none text-white placeholder-gray-300"
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter your password"
              />
            </div>

            {/* Button */}
            <button
              type="submit"
              className="mt-4 bg-white text-black py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg "
            >
              Login
            </button>
          </form>

          {/* Signup Redirect */}
          <p className="mt-8 text-center text-gray-300">
            Don’t have an account?{" "}
            <span
              className="cursor-pointer font-semibold text-blue-400 hover:text-blue-300 transition-all"
              onClick={() => navigate("/signup")}
            >
              Signup now
            </span>
          </p>
        </div>
      </div>
  
    </div>
  );
}
