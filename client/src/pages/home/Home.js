import React from 'react'
import Navbar from '../../components/navbar/Navbar'
import classes from './home.module.css'
import FeaturedBlogs from '../../components/featuredBlogs/FeaturedBlogs'



function Home() {
  return (
    <div>
        <Navbar/>
        <FeaturedBlogs/>
        
    </div>
  )
}

export default Home