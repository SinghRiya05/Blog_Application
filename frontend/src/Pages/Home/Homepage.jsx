import React from "react";
import Hero from "./Hero";
import AllBlog from "./AllBlog";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import Category from "./Category.jsx";
import Last from "./Last.jsx";


export default function Homepage() {
  return (
    <div>
      <Navbar />
      <Hero />
      <AllBlog />
      <Category/>
      <Last/>
      <Footer />
    </div>
  );
}
