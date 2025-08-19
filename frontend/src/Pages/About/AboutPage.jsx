import React from "react";
import about1 from "../../assets/abou1.png";
import Card from "./Card";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";


export default function AboutPage() {
  const navigate=useNavigate();
  return (
    <>
      
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        viewport={{ once: true }}
        className="relative bg-gradient-to-r from-blue-950 via-blue-900 to-indigo-900 px-8 py-20 w-full text-center  shadow-xl overflow-hidden"
      >
        {/* Decorative Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.08),transparent_50%)] pointer-events-none"></div>

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-5xl sm:text-6xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-400 drop-shadow-lg">
            Welcome to{" "}
            <span className="bg-gradient-to-r from-blue-300 to-cyan-400 bg-clip-text text-transparent">
              MyBlog Space!
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-200 font-serif leading-relaxed">
            MyBlog Space is a platform where anyone can create and share their
            own blogs with the world. Whether you're a passionate writer, tech
            enthusiast, traveler, foodie, or someone who simply wants to express
            their thoughts — this is your space to be heard.
          </p>

          <p className="text-lg sm:text-xl font-serif text-gray-300 mt-6 leading-relaxed">
            Our goal is to build an open and inspiring blogging community where
            creativity, freedom of expression, and learning come together.
            MyBlog Space gives every user a voice — allowing them to write blogs,
            personalize them, and connect with other like-minded writers.
          </p>

          {/* CTA */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-10 px-8 py-3 text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full shadow-lg hover:shadow-2xl transition-all"
            onClick={()=>navigate("/home")}
          >
            Get Started 🚀
          </motion.button>
        </div>
      </motion.section>

      

        {/* Mission Section */}
        <motion.section
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex justify-center items-center gap-12  w-full bg-gray-100   px-10 py-12 border border-gray-200"
        >
          {/* Text */}
          <div className="lg:w-2/3">
            <h2 className="text-4xl text-center font-bold mb-6 text-gray-800">🌟 Our Mission</h2>
            <p className="text-xl text-gray-700 leading-relaxed">
              At MyBlog Space, our mission is to empower individuals to share
              their voice freely and creatively. We believe that everyone has a
              story to tell, knowledge to share, or ideas worth spreading — and
              blogging is one of the best ways to do that.
            </p>
            <p className="text-xl text-gray-700 mt-4 leading-relaxed">
              We’ve built MyBlog Space not just as a blogging tool, but as a
              complete platform where:
            </p>
            <ul className="list-disc ml-6 mt-4 text-gray-700 text-xl space-y-2">
              <li>Users can create, edit, and delete their own blogs anytime.</li>
              <li>
                Blogs can be organized into different categories for better reach
                and discovery.
              </li>
            </ul>
          </div>

          
          
        </motion.section>

        {/* Feature Cards */}
        <div className="text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-8 mt-12">✨ Features</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 lg:px-20 ">
            {[
              { title: "Create Blogs", desc: "Write freely and express yourself with your own blog posts" },
              { title: "Edit Anytime", desc: "Update or refine your blogs anytime you want." },
              { title: "Delete Posts", desc: "Not happy with a blog? You can remove it anytime." },
              { title: "Use Categories", desc: "Keep your content well-organized using categories." },
              { title: "Engage with Comments", desc: "Let readers respond to your blogs through comments." },
              { title: "Full Control", desc: "You manage your content — publish, edit, or delete with ease." },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <Card title={item.title} description={item.desc} />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Privacy Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="bg-gray-100  px-10 py-10  w-full text-center border mt-12 "
        >
          <h3 className="text-3xl font-bold text-gray-800 mb-6">
            🔒 Privacy & Control
          </h3>
          <p className="text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto">
            You have complete ownership of your content. Only you can create,
            edit, or delete your blogs. We never share your data — your voice
            stays yours. MyBlog Space ensures full freedom, transparency, and
            privacy — always.
          </p>
        </motion.div>
      
    </>
  );
}
