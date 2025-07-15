import React from "react";
import hero from "../../assets/hero1.jpg";

export default function Hero() {
  return (
    <div className="relative h-[42rem] overflow-hidden flex items-center justify-center text-center px-4 sm:px-8">

     
      <img
        src={hero}
        alt="hero"
        className="absolute inset-0 w-full h-full object-cover blur-sm scale-105"
      />

     
      <div className="absolute inset-0 bg-black bg-opacity-30"></div>

      <div className="relative  z-10 text-white max-w-4xl text-left mb-14">
        {/* Hero Title */}
        <h1 className="text-4xl lg:text-5xl font-semibold leading-relaxed lg:leading-relaxed">
         BlogSpace: Where Every Thought Finds a Voice
Write Freely, Learn Deeply, Connect Globally
        </h1>

        {/* Hero Description */}
        <div className="text-[1.2rem] lg:text-[1.3rem] mt-12 opacity-90 leading-relaxed  p-3 py-5 rounded-2xl bg-slate-800 bg-opacity-50 hover:bg-opacity-65 hover:scale-105 transition-all duration-700">
          <p>Got something on your mind? Just write it.</p>
          <p>Share your thoughts, ideas, stories — whatever feels right.</p>
          <p>It’s your space to be real, relaxed, and creative.</p>
        </div>
      </div>
    </div>
  );
}
