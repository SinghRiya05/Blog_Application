import React from "react";
import about1 from "../../assets/abou1.png";
import Card from "./Card";

export default function AboutPage() {
  return (
    <div className="flex flex-col items-center px-4 py-10 bg-white gap-16 mt-2">
      
      {/* Welcome Section */}
      <div className="bg-slate-100 rounded-2xl shadow-md px-6 py-8 max-w-5xl w-full mb-10 text-center">
        <h1 className="text-3xl font-bold mb-4">Welcome to <span className="text-blue-700">MyBlog Space!</span></h1>
        <p className="text-lg font-serif text-gray-700">
          MyBlog Space is a platform where anyone can create and share their own
          blogs with the world. Whether you're a passionate writer, tech
          enthusiast, traveler, foodie, or someone who simply wants to express
          their thoughts — this is your space to be heard.
        </p>
        <p className="text-lg font-serif text-gray-700 mt-4">
          Our goal is to build an open and inspiring blogging community where
          creativity, freedom of expression, and learning come together. MyBlog
          Space gives every user a voice — allowing them to write blogs,
          personalize them, and connect with other like-minded writers.
        </p>
      </div>

      {/* Mission Section */}
      <div className="flex flex-col lg:flex-row items-center gap-8 max-w-5xl w-full bg-slate-100 rounded-2xl shadow-md px-6 py-8">
        
        {/* Text */}
        <div className="lg:w-2/3">
          <h2 className="text-3xl font-semibold mb-4">Our Mission</h2>
          <p className="text-lg font-serif text-gray-700">
            At MyBlog Space, our mission is to empower individuals to share
            their voice freely and creatively. We believe that everyone has a
            story to tell, knowledge to share, or ideas worth spreading — and
            blogging is one of the best ways to do that.
          </p>
          <p className="text-lg font-serif text-gray-700 mt-3">
            We’ve built MyBlog Space not just as a blogging tool, but as a
            complete platform where:
          </p>
          <ul className="list-disc ml-5 mt-3 text-gray-700 text-base">
            <li>Users can create, edit, and delete their own blogs anytime.</li>
            <li>Blogs can be organized into different categories for better reach and discovery.</li>
          </ul>
        </div>

        {/* Image */}
        <div className="lg:w-1/3 flex justify-center">
          <img src={about1} alt="Illustration showing blogging concept" className="w-[260px] h-auto rounded-xl" />
        </div>
      </div>

      <div className="flex flex-wrap justify-between max-w-5xl mt-10">
        <Card title={"Create Blogs"} description={"Write freely and express yourself with your own blog posts"} />
        <Card title={"Edit Anytime"} description={"Update or refine your blogs anytime you want."} />
        <Card title={" Delete Posts"} description={"Not happy with a blog? You can remove it anytime."} />
        <Card title={" Use Categories"} description={"Keep your content well-organized using categories."} />
        <Card title={" Engage with Comments"} description={"Let readers respond to your blogs through comments."} />
        <Card title={"  Full Control"} description={"You manage your content — publish, edit, or delete with ease."} />
        
      </div>
   <div className="bg-slate-100 rounded-2xl shadow-md px-6 py-8 max-w-5xl w-full mb-10 text-center">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">🔒 Privacy & Control</h3>

        <p className="text-lg font-serif text-gray-700">
         You have complete ownership of your content.
Only you can create, edit, or delete your blogs.
We never share your data — your voice stays yours.
MyBlog Space ensures full freedom, transparency, and privacy — always.
        </p>
     
      </div>
    </div>
  );
}
