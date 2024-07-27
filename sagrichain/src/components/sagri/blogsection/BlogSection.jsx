import React, { useState, useEffect } from "react";

const BlogSection = () => {
  const [showVideo, setShowVideo] = useState(false);
  const [videoWidth, setVideoWidth] = useState(560);
  const [videoHeight, setVideoHeight] = useState(315);

  const playVideo = () => {
    setShowVideo(true);
    document.body.style.overflow = "hidden"; // Prevent scrolling
  };

  const closeModal = () => {
    setShowVideo(false);
    document.body.style.overflow = ""; // Enable scrolling
  };

  useEffect(() => {
    const handleResize = () => {
      const containerWidth = window.innerWidth;
      // Adjust video size based on container width
      if (containerWidth < 768) {
        setVideoWidth(containerWidth);
        setVideoHeight((containerWidth / 16) * 9);
      } else {
        setVideoWidth(560);
        setVideoHeight(315);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      className="my-20 flex flex-col items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: "url(/img/bg/breadcrumb_bg04.jpg)",
        width: "1519.2px",
        height: "500.5px",
        maxWidth: "100%",
        maxHeight: "100vh",
        opacity:"90rm"
      }}
    >
      <div
        className="w-20 h-16 bg-green-500 flex items-center justify-center cursor-pointer"
        onClick={playVideo}
      >
        <img
          src="/player.svg"
          alt="Player Icon"
          className="text-white w-8 h-8"
        />
      </div>
      <div className="p-6 flex flex-col items-center text-center">
        <p className="text-white text-center">HELLO and WELCOME TO FARM</p>
        <h1 className="text-4xl mt-2 font-bold mb-6 text-white">
          YOUR SUPPORT FARM 24/7
        </h1>
        <img src="/img/images/w_title_shape.png" alt="Title_Shape_image" />
      </div>

      {showVideo && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75">
          <div className="relative">
            <button
              className="absolute top-2 right-2 text-white text-xl"
              onClick={closeModal}
            >
              X
            </button>
            <div className="aspect-w-30 aspect-h-20">
              <iframe
                title="YouTube Video"
                width={videoWidth}
                height={videoHeight}
                src="https://www.youtube.com/embed/GAkDsGzpQII"
                frameBorder="0"
                allow="autoplay; encrypted-media"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogSection;
