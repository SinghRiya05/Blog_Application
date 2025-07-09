import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Homepage from "./components/Home/Homepage";


import Layout from "./components/Dashboard/Layout";
import Dashboard from "./components/Dashboard/Dashboard";
import AddBlog from "./components/Dashboard/AddBlog";
import Bloglist from "./components/Dashboard/Bloglist";
import Comment from "./components/Dashboard/Comment";

import Signup from "./components/Signup";
import Login from "./components/Login";
import UserLayout from "./components/UserDashboard/UserLayout";
import UserDashboard from "./components/UserDashboard/UserDashboard";
import UserAddBlog from "./components/UserDashboard/UserAddBlog";
import UserBloglist from "./components/UserDashboard/UserBloglist";
import UserComment from "./components/UserDashboard/UserComment";

import { jwtDecode } from "jwt-decode";
import Blog from "./components/Blog/Blog";

function App() {
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true); // loading state to wait for cookie

  useEffect(() => {
    const token =  localStorage.getItem("token");
    console.log(token);
    
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setRole(decoded.role);
      } catch (err) {
        console.error("Invalid token", err);
        setRole(null);
      }
    }
    setLoading(false);
  }, []);

  if (loading) {
    return <div>Loading...</div>; // wait until cookie is checked
  }

  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/blog/:id" element={<Blog />} />

      {/* Admin Routes */}
      <Route
        path="/admin"
        element={
          role === "admin" ? <Layout /> : <Navigate to="/login" replace />
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="addBlog" element={<AddBlog />} />
        <Route path="listBlog" element={<Bloglist />} />
        <Route path="comments" element={<Comment />} />
      </Route>

      {/* User Routes */}
      <Route
        path="/user"
        element={
          role === "user" ? <UserLayout /> : <Navigate to="/login" replace />
        }
      >
        <Route index element={<UserDashboard />} />
        <Route path="addBlog" element={<UserAddBlog />} />
        <Route path="listBlog" element={<UserBloglist />} />
        <Route path="comments" element={<UserComment />} />
      </Route>

      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
}

export default App;
