import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import BlogPage from "./BlogPage";
import Footer from "../../components/Footer/Footer";
export default function Blog() {
  return (
    <div>
      <Navbar/>
      <BlogPage />
      <Footer />
    </div>
  );
}
