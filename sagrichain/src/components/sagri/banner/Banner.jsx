import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import 'animate.css/animate.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Banner = () => {
  const sliderRef = useRef();
  const [activeDot, setActiveDot] = useState(0);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    if (typeof window !== 'undefined') {
      window.addEventListener("resize", handleResize);
    }

    const interval = setInterval(() => {
      sliderRef.current.slickNext();
    }, 5000);

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener("resize", handleResize);
      }
      clearInterval(interval);
    };
  }, []);

  // Responsive textStyle
  const textStyle = {
    textAlign: 'left',
    maxWidth: windowWidth < 768 ? '90%' : '60%',
    position: 'absolute',
    top: windowWidth < 768 ? '20%' : '50%',
    left: '50%',
    transform: windowWidth < 768 ? 'translate(-50%, 0)' : 'translate(-50%, -50%)',
    zIndex: 10,
    fontSize: windowWidth < 768 ? '16px' : 'inherit',
    color: '#ffffff',  // Ensure text color is white for better visibility
    textShadow: '2px 2px 8px rgba(0, 0, 0, 0.7)'  // Add text shadow for better readability
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    dotsClass: "slick-dots",
    beforeChange: (current, next) => setActiveDot(next),
  };

  const handleDotClick = (index) => {
    sliderRef.current.slickGoTo(index);
  };

  return (
    <div className="relative mx-auto w-full">
      <Slider {...settings} ref={sliderRef}>
        {[0, 1, 2].map(index => (
          <div key={index} className="relative h-[calc(100vh-70px)] text-center">
            <img
              src={`/slider_${index + 1}.jpg`}
              sizes="100vw"
              alt={`image ${index + 1}`}
              className="h-[calc(100vh-70px)] w-full object-cover animate__animated animate__fadeIn"
              style={{ filter: 'brightness(30%)' }}  // Darken images slightly for better text contrast
            />
            <div style={textStyle} className="container text-white">
              <p className="text-xl mt-2 animate__animated animate__fadeInDown animate__delay-1s">
                {index === 0 ? "DIGITISE COMPLETE VALUE CHAIN AND INTEGRATE MULTIPLE STAKEHOLDERS TO MAXIMISE SUPPLY CHAIN TRANSPARENCY. MEET REGULATORY COMPLIANCE AND TRACK PROVENANCE WITH OUR BLOCKCHAIN-POWERED PLATFORM."
                  : index === 1 ? "AGRI-FOOD IMPORTERS AND EXPORTERS TURN TO US TO SOLVE THEIR SUPPLY CHAIN PROBLEMS"
                  : "FROM CERTIFICATIONS AND PROCUREMENT TO TRACKING ACROSS WAREHOUSES AND LOGISTICS, WE ARE THE PARTNER OF CHOICE FOR THE WORLD'S BIGGEST GROWERS AND MORE."}
              </p>
              <h2 className="text-4xl font-bold animate__animated animate__fadeInUp animate__delay-2s">
                {index === 0 ? "PROVIDE FULL TRACEABILITY AND TRANSPARENCY"
                  : index === 1 ? "WE PROVIDE THE ONE PLATFORM THAT DOES IT ALL FOR YOU"
                  : "WE MAKE GLOBAL SUPPLY CHAINS MORE EFFICIENT"}
              </h2>
            </div>
          </div>
        ))}
      </Slider>
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20">
        <ul className="flex space-x-2">
          {[0, 1, 2].map((index) => (
            <li
              key={index}
              className={`w-3 h-3 rounded-full cursor-pointer ${activeDot === index ? 'bg-[#fbbf24]' : 'bg-gray-100'}`}
              onClick={() => handleDotClick(index)}
            ></li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Banner;
