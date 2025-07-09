import React from 'react';

export default function Hero() {

  

  return (
    <div className='text-center mt-20 px-4 sm:px-8 '>
      
     

      {/* Hero Title */}
      <h1 className='text-4xl sm:text-6xl lg:text-6xl font-semibold text-gray-800'>
        Create. Express. Connect — <br /> all in your own space.
      </h1>

      {/* Hero Description */}
      <div className=' text-[1.2rem] lg:text-[1.3rem] mt-4 opacity-70 leading-relaxed'>
        <p className="">Got something on your mind? Just write it.</p>
        <p className="">Share your thoughts, ideas, stories — whatever feels right.</p>
        <p>It’s your space to be real, relaxed, and creative.</p>
      </div>
      <div className="text-center mt-16 px-4">
      <form className="  search-form flex max-w-md mx-auto bg-white border border-gray-700 rounded-full overflow-hidden">

        {/* Input */}
        <input
          type="text"
          placeholder ="Search for blogs"
          required
          className="w-full px-7 py-2 text-gray-700 outline-none  ml-2 rounded-md "
        />

        {/* Button */}
      <button
  type="submit"
  className="bg-[#352f44] text-white px-5 py-2 rounded-full ml-2 cursor-pointer border-none text-base"
>
  Search
</button>


      </form>
    </div>
    </div>
    
  );
}
