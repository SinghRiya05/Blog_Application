import React from 'react'
import logo from '../../assets/blog-logo.svg'
import { footer_data } from '../../assets/assets'
export default function Footer() {
  return (
    <div className='px-6 md:px-16 lg:px-24 xl:px-32 bg-slate-50'>
     <div className='flex flex-col md:flex-row items-start justify-between gap-10 py-10 border-b border-gray-500/30 text gray-500'>
<div > 
    <div className='flex items-center gap-5'><img src={logo} alt="" width={50} />
    <h2>MyBlogSpace</h2></div>
    <p className='max-w-[410px] mt-6 opacity-80'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti, laudantium corporis! Eligendi animi sed illo necessitatibus modi at fugit tempora?
    </p>
</div>
<div className='flex flex-wrap justify-between w-full md:w-[45%] gap-5'>
    {footer_data.map((section,index)=>(
        <div key={index}>
            <h3 className='font-semibold text-base text-gray-700 md:mb-5 mb-2'>{section.title}</h3>
            <ul className='text-sm space-y-1'>
                {section.links.map((link,i)=>(
                    <li key={i} className='list-none '>
                        <a href="#" className='hover:underline transition no-underline text-gray-700'>{link}</a>
                    </li>
                ))}
            </ul>
        </div>
    ))}
</div>
     </div>
     <p className='py-4 text-center text-sm md:text-base text-gray-500/80'>Copyright 2025 MyBlogSpace -All Right Reserved</p>
    </div>
  )
}
