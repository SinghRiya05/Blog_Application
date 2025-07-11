// src/routes.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Homepage from "./Pages/Home/Homepage";
import Layout from "./Pages/AdminDashboard/Layout/Layout";
import Dashboard from "./Pages/AdminDashboard/Layout/Dashboard";
import AddBlog from "./Pages/AdminDashboard/CRUD/AddBlog";
import Bloglist from "./Pages/AdminDashboard/CRUD/Bloglist";
import Comment from "./Pages/AdminDashboard/CRUD/Comment";
import Signup from "./Pages/auth/Signup";
import Login from "./Pages/auth/Login";
import UserLayout from "./Pages/UserDashboard/Layout/UserLayout"
import UserDashboard from "./Pages/UserDashboard/Layout/UserDashboard";
import UserAddBlog from "./Pages/UserDashboard/CRUD/UserAddBlog";
import UserBloglist from "./Pages/UserDashboard/CRUD/UserBloglist";
import UserComment from "./Pages/UserDashboard/CRUD/UserComment";
import Blog from "./Pages/Blog/Blog";
import EditBlog from "./Pages/AdminDashboard/CRUD/EditBlog";
import UserEditBlog from "./Pages/UserDashboard/CRUD/UserEditBlog";

const AppRoutes = ({ role, setRole }) => {
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
        <Route path="/admin/editBlog/:id" element={<EditBlog />} />
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
        <Route path="/user/editBlog/:id" element={<UserEditBlog />} />
      </Route>

      <Route path="/login" element={<Login setRole={setRole} />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
};

export default AppRoutes;
