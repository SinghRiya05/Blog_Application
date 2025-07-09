import React from 'react';

export default function Loader() {
  return (
    <div className='flex justify-center items-center h-screen bg-white'>
      <div className='animate-spin rounded-full h-16 w-16 border-4 border-t-transparent border-[#352f44]'></div>
    </div>
  );
}
