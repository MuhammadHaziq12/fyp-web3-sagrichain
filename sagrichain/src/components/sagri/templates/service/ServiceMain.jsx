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
    <div className="bg-gray-50 py-20 relative my-20">
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