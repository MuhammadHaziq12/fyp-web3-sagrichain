import React, { useState } from "react";
import { Card, CardHeader, CardBody, Typography, Button } from "@material-tailwind/react";
import ServiceFirst from "./ServiceFirst";
import ServiceSecond from "./ServiceSecond";
import ServiceThird from "./ServiceThird";

const ServiceMain = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const slides = [<ServiceFirst />, <ServiceSecond />, <ServiceThird />];

  const handlePrev = () => {
    setActiveSlide((prevSlide) => (prevSlide === 0 ? slides.length - 1 : prevSlide - 1));
  };

  const handleNext = () => {
    setActiveSlide((prevSlide) => (prevSlide === slides.length - 1 ? 0 : prevSlide + 1));
  };

  return (
    <div className="bg-gray-50 py-20 relative my-20" id="service">
      {/*Heading*/}
      <div className="p-8 flex flex-col items-center text-center">
        <p className="text-[#7a9c74] text-center">WHAT WE PROVIDE</p>
        <h1 className="text-4xl  mt-2 font-bold mb-6 text-[#9cc623]">
          OUR <span className="text-[#404a3d]">SERVICES</span>
        </h1>
        {/* <div className="w-16 h-1 bg-green-200 mb-8"></div> Divider line */}
        <img src={"/title_shape.png"} alt="Title_Shape_image" />
      </div>
      {slides[activeSlide]}
      <button
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-transparent text-3xl p-2 transition duration-300 hover:bg-green-500 hover:text-gray-200 focus:outline-none"
        onClick={handlePrev}
      >
        ←
      </button>
      <button
        className="text-black-100 absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-100 text-3xl p-2  transition duration-300 hover:bg-green-500 hover:text-gray-100 focus:outline-none"
        onClick={handleNext}
      >
        →
      </button>
    </div>
  );
};

export default ServiceMain;