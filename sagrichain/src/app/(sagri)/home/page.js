//page.js
"use client"
import React from 'react'
import Banner from '@/components/banner/Banner';
import Intro from '@/components/intro/Intro';
import Service from '@/components/service/ServiceMain';
import StakeHolder from '@/components/stakeholderInfo/StakeHolder';
import Gallery from '@/components/galley/Gallery';
import TrackTrace from '@/components/tracktrace/TrackTrace';
import BlogSection from '@/components/blogsection/BlogSection';
import FooterBlog from '@/components/footerblog/FooterBlog';
// import Contact from '@/components/contact/Contact';
// import About from '@/components/about/About';


const Home = () => {
  return (
    <>
      <Banner />
      <Intro/>
      <Service/>
      <StakeHolder/>
      <Gallery/>
      <BlogSection/>
      <TrackTrace/>
      <FooterBlog/>
      {/* <About/> */}
      {/* <Contact/>
      <Gallery/> */}
    </>
    
  )
}

export default Home;