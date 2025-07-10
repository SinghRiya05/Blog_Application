import React from "react";
import Hero from "./Hero";
import AllBlog from "./AllBlog";
import Navbar from "../Navbar";
import Footer from "../Footer";

export default function Homepage() {
  return (
    <div>
      <Navbar />
      <Hero />
      <AllBlog />
      <Footer />
    </div>
  );
}
