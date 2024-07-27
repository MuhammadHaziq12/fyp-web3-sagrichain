//page.js
"use client"
import React from 'react'
import Banner from '@/src/components/sagri/banner/Banner';
import Intro from '@/src/components/sagri/intro/Intro';
import Service from '@/src/components/sagri/service/ServiceMain';
import StakeHolder from '@/src/components/sagri/stakeholderInfo/StakeHolder';
import Gallery from '@/src/components/sagri/galley/Gallery';
import TrackTrace from '@/src/components/sagri/tracktrace/TrackTrace';
import BlogSection from '@/src/components/sagri/blogsection/BlogSection';
import FooterBlog from '@/src/components/sagri/footerblog/FooterBlog';
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