import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Gallery = () => {
  const [slidesToShow, setSlidesToShow] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setSlidesToShow(1);
      } else {
        setSlidesToShow(3);
      }
    };

    window.addEventListener("resize", handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="bg-green-50 py-20 mt-20">
      <div className="md:container  md:mx-auto">
        <div className="p-8 flex flex-col items-center text-center">
          <p className="text-[#7a9c74] text-center">
            WHAT WE DO
          </p>
          <h1 className="text-4xl  mt-2 font-bold mb-6 text-[#9cc623]">
            ONE PLATFORM <span className="text-[#404a3d]">TO DO IT ALL</span>
          </h1>
          {/* <div className="w-16 h-1 bg-green-200 mb-8"></div> Divider line */}
          <img src={"/title_shape.png"} alt="Title_Shape_image" />
        </div>
        <Slider {...settings}>
          {/* <div className="mx-12">
            <div className="w-[320px] h-[320px] bg-green-500 rounded-lg shadow-lg">
              <img
                src="/img/blog/blog_post_thumb01.jpg"
                alt="Image 1"
                className="w-full h-full object-cover"
              />
            </div>
          </div> */}
          <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow overflow-hidden">
            <div className="bg-gray-800">
              <img
                src="/img/images/project_thumb04.jpg"
                alt="Team Member 2"
                className="w-full object-cover"
              />
            </div>
          </div>
          {/* <div className="mx-12">
            <div className="w-[320px] h-[320px] bg-green-500 rounded-lg shadow-lg">
              <img
                src="/img/blog/blog_post_thumb03.jpg"
                alt="Image 2"
                className="w-full h-full object-cover"
              />
            </div>
          </div> */}
          <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow overflow-hidden">
            <div className="bg-gray-800">
              <img
                src="/img/images/project_thumb03.jpg"
                alt="Team Member 2"
                className="w-full object-cover"
              />
            </div>
          </div>
          {/* <div className="mx-12">
            <div className="w-[320px] h-[320px] bg-green-500 rounded-lg shadow-lg">
              <img
                src="/img/blog/blog_post_thumb02.jpg"
                alt="Image 3"
                className="w-full h-full object-cover"
              />
            </div>
          </div> */}
          <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow overflow-hidden">
            <div className="bg-gray-800">
              <img
                src="/img/images/project_thumb02.jpg"
                alt="Team Member 2"
                className="w-full object-cover"
              />
            </div>
          </div>
          {/* <div className="mx-12">
            <div className="w-[320px] h-[320px] bg-green-500 rounded-lg shadow-lg">
              <img
                src="/img/images/project_thumb0.jpg"
                alt="Image 4"
                className="w-full h-full object-cover"
              />
            </div>
          </div> */}
          <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow overflow-hidden">
            <div className="bg-gray-800">
              <img
                src="/img/images/project_thumb01.jpg"
                alt="Team Member 2"
                className="w-full  object-cover"
              />
            </div>
          </div>
        </Slider>
      </div>
    </div>
  );
};

export default Gallery;
