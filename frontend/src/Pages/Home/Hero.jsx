import React from "react";
import hero from "../../assets/hero1.jpg";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <div className="relative h-[40rem] overflow-hidden flex items-center justify-center text-center px-4 sm:px-8">

      {/* Background Image with Slow Zoom Animation */}
      <motion.img
        src={hero}
        alt="hero"
        className="absolute inset-0 w-full h-full object-cover blur-sm scale-105"
        initial={{ scale: 1 }}
        animate={{ scale: 1.1 }}
        transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-30"></div>

      {/* Hero Content */}
      <div className="relative z-10 text-white max-w-4xl text-left mb-14">
        {/* Hero Title */}
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-3xl sm:text-4xl  font-semibold leading-relaxed lg:leading-relaxed"
        >
          BlogSpace: Where Every Thought Finds a Voice <br />
          Write Freely, Learn Deeply, Connect Globally
        </motion.h1>

        {/* Hero Description */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-[1.2rem] lg:text-[1.3rem] mt-12 opacity-90 leading-relaxed p-3 py-5 rounded-2xl bg-slate-800 bg-opacity-50 hover:bg-opacity-65 hover:scale-105 transition-all duration-700"
        >
          <p>Got something on your mind? Just write it.</p>
          <p>Share your thoughts, ideas, stories — whatever feels right.</p>
          <p>It’s your space to be real, relaxed, and creative.</p>
        </motion.div>
      </div>
    </div>
  );
}
