import React from 'react'
import Navbar from '../../components/navbar/Navbar'
import classes from './home.module.css'
import FeaturedBlogs from '../../components/featuredBlogs/FeaturedBlogs'
import Categories from '../../components/categories/Categories'



function Home() {
  return (
    <div>
        <Navbar/>
        <FeaturedBlogs/>
        <Categories/>
        
    </div>
  )
}

export default Home