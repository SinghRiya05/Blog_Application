import React, { useEffect, useState } from 'react'

import axios from '../../../api/axios'
import { useParams } from 'react-router-dom'
import BlogCard from '../../Home/BlogCard'
import Loader from '../../../components/Loader'

export default function Hero() {
  const [blogs, setBlogs] = useState([])
  const [category, setCategory] = useState()
  const [loader, setLoader] = useState()
  const { slug } = useParams()

  const fetchBlogs = async () => {
    try {
      setLoader(true)
      const res = await axios.get(`blog/category/${slug}`)
      setLoader(false)
      setBlogs(res.data.data)
    } catch (error) {
      console.log(error)
      setLoader(false)
    }
  }

  useEffect(() => {
    const fetchCat = async () => {
      try {
        const res = await axios.get(`category/single/${slug}`)
        setCategory(res.data.data)
      } catch (error) {
        console.log(error)
      }
    }

    fetchCat()
    fetchBlogs()
  }, [slug])

  if(loader){
    return (
      <Loader/>
    )
  }

  return (
    <>
     
      <div className=' min-h-screen py-10' style={{background:"linear-gradient(115deg, #ffffff, #d4dfed)"}}>
        <div className='text-center rounded-xl mx-10 md:mx-24 bg-slate-200 shadow-md py-6 px-4 mb-10'>
          <h1 className='text-3xl font-bold text-blue-950'>{category?.name}</h1>
          <p className='text-gray-800 mt-2'>{category?.description}</p>
        </div>

        <div className='mx-5 '>
          {blogs.length > 0 ? (
            <div className="flex flex-wrap justify-center justify-around">
              {blogs.map((blog) => (
                <BlogCard key={blog._id} blog={blog} />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">No blogs found in this category.</p>
          )}
        </div>
      </div>
      
    </>
  )
}
