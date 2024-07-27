import React from 'react';
import Link from "next/link";
import Image from 'next/image';

const Intro = () => {
  return (
    <div className='container mx-auto my-20'>
      {/*Heading*/}
      <div className="p-8 flex flex-col items-center text-center">
        <p className="text-[#7a9c74] text-center">SAGRICHAIN-SECURE AGRICULTURE SUPPLY CHAIN</p>
        <h1 className="text-4xl mt-2 font-bold mb-6 text-[#9cc623]">WELCOME <span className='text-[#404a3d]'>TO ORGANIC</span></h1>
        {/* <div className="w-16 h-1 bg-green-200 mb-8"></div> Divider line */}
        <img
            src={"/title_shape.png"}
            alt="Title_Shape_image"  
        />
      </div>

      {/*Cards*/}
      <div className="mt-4 m-px container mx-auto flex flex-wrap justify-around items-center ">
        {/*Card 1*/}
        <div className="bg-[#f8f5f0] card mb-8 relative flex flex-col items-center p-6 w-80 border border-gray-200 rounded-lg shadow-md">
          <div className="rounded overflow-hidden h-44 w-44 mb-4 relative">
            <img
              src="/features_img01.png"
              alt="Image 1"
              className="h-full w-full"
            />
          </div>
          <img
            src={"/features_shape.png"}
            alt="image 1"/>
          <h2 className="text-xl font-bold mb-2 hover:text-[#9cc623]">ORGANIC FARM</h2>
          <p className="text-[#7d7d7d] text-center max-w-sm">Agriculture means crops, livestock, and livestock products</p>
        </div>

        {/*Card 2*/}
        <div className="bg-[#f8f5f0] card mb-8 relative flex flex-col items-center p-6 w-80 border border-gray-200 rounded-lg shadow-md">
          <div className="rounded overflow-hidden h-44 w-44 mb-4 relative">
            <img
              src="/features_img02.png"
              alt="Image 2"
              className="h-full w-full"
            />
          </div>
          <img
            src={"/features_shape.png"}
            alt="image 1"/>
          <h2 className="text-xl font-bold mb-2 hover:text-[#9cc623]">DAIRY PRODUCTS</h2>
          <p className="text-[#7d7d7d] text-center max-w-sm">Agriculture means crops, livestock, and livestock products</p>
        </div>

        {/*Card 3*/}
        <div className="bg-[#f8f5f0] card mb-8 relative flex flex-col items-center p-6 w-80 border border-gray-200 rounded-lg shadow-md">
          <div className="rounded overflow-hidden h-44 w-44 mb-4 relative">
            <img
              src="/features_img03.png"
              alt="Image 3"
              className="h-full w-full object-cover transition-opacity"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="absolute h-16 w-16 text-white opacity-0 hover:opacity-100 transition-opacity"
            >
              {/* Add your SVG path or content here */}
              <path
                fillRule="evenodd"
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <img
            src={"/features_shape.png"}
            alt="image 1"/>
          <h2 className="text-xl font-bold mb-2 hover:text-[#9cc623]">POULTRY PRODUCTS</h2>
          <p className="text-[#7d7d7d] text-center max-w-sm">Agriculture means crops, livestock, and livestock products</p>
        </div>

        {/*Card 4*/}
        <div className="bg-[#f8f5f0] card mb-8 relative flex flex-col items-center p-6 w-80 border border-gray-200 rounded-lg shadow-md">
          <div className="rounded overflow-hidden h-44 w-44 mb-4 relative">
            <img
              src="/features_img04.png"
              alt="Image 4"
              className="h-full w-full object-cover"
            />
          </div>
          <img
            src={"/features_shape.png"}
            alt="image 1"/>
          <h2 className="text-xl font-bold mb-2 hover:text-[#9cc623]">CROP HARVESTER</h2>
          <p className="text-[#7d7d7d] text-center max-w-sm">Agriculture means crops, livestock, and livestock products</p>
        </div>
      </div>
    </div>
  );
};

export default Intro;