import React from "react";
import 'animate.css/animate.css';
import { Carousel } from "@material-tailwind/react";

const Banner = () => {
  return (
    <div className="relative mx-auto w-full">
      <Carousel
        responsive={[
          {
            breakpoint: "sm",
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
            },
          },
          {
            breakpoint: "md",
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
            },
          },
          {
            breakpoint: "lg",
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
            },
          },
          {
            breakpoint: "xl",
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
            },
          },
        ]}
        className="w-full"
        controls={false}
      >
        {/* Slide 1 */}
        <div className="relative h-[calc(100vh-70px)] text-center">
          <img
            src={"/slider_3.jpg"}
            sizes="100vw"
            alt="image 1"
            className="h-[calc(100vh-70px)] w-full object-cover"
          />
          <div className="container absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white z-10">
            <h2 className="text-6xl font-bold animate__animated animate__fadeInUp animate__delay-1s">
              Provide full Traceability and Transparency
            </h2>
            <p className="text-xl mt-2 animate__animated animate__fadeInUp animate__delay-2s">
              Digitise complete value chain and integrate multiple stakeholders to maximise supply chain transparency. Meet regulatory compliance and track provenance with our blockchain-powered platform.
            </p>
          </div>
        </div>

        {/* Slide 2 */}
        <div className="relative h-[calc(100vh-70px)] text-center">
          <img
            src={"/slider_1.jpg"}
            sizes="100vw"
            alt="image 2"
            className="h-[calc(100vh-70px)] w-full object-cover"
          />
          <div className="container absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white z-10">
            <h2 className="text-6xl font-bold animate__animated animate__fadeInUp animate__delay-1s">
              Agri-food importers and exporters turn to us to solve their supply chain problems
            </h2>
            <p className="text-xl mt-2 animate__animated animate__fadeInUp animate__delay-2s">
              We provide the one platform that does it all for you
            </p>
          </div>
        </div>

        {/* Slide 3 */}
        <div className="relative h-[calc(100vh-70px)] text-center">
          <img
            src={"/slider_2.jpg"}
            sizes="100vw"
            alt="image 3"
            className="h-[calc(100vh-70px)] w-full object-cover"
          />
         <div className="container absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white z-10">
            <h2 className="text-6xl font-bold animate__animated animate__fadeInUp animate__delay-1s">
              We Make Global Supply Chains More Efficient
            </h2> 
            <p className="text-xl mt-2 animate__animated animate__fadeInUp animate animate__delay-2s">
              From certifications and procurement to tracking across warehouses and logistics, we are the partner of choice for the world's biggest growers and more.
            </p>
          </div>
        </div>
      </Carousel>
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
        <ul className="flex space-x-2">
          <li className="w-3 h-3 rounded-full bg-gray-400"></li>
          <li className="w-3 h-3 rounded-full bg-gray-400"></li>
          <li className="w-3 h-3 rounded-full bg-gray-400"></li>
        </ul>
      </div>
    </div>
  );
};

export default Banner;