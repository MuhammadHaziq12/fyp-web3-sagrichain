"use client"
import React from "react";

const About = () => {
  return (
    <div>
      {/* BREADCRUMB */}
      <div
        className="flex items-center justify-center bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url(/img/bg/breadcrumb_bg02.jpg)",
          height: "290.5px",
        }}
      >
        <div className="p-6 flex flex-col items-center text-center">
          <h1 className="text-4xl mt-2 font-bold mb-6 text-white">ABOUT US</h1>
          <img src="/img/images/w_title_shape.png" alt="Title_Shape_image" />
        </div>
      </div>
      {/* BREADCRUMB END */}
      {/* About Section */}
      <section className="justify-around bg-gray-100 py-20">
        <div className="container mx-auto">
          <div className="mx-10 grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Grid Box 1 */}
            <div className="text-center p-6">
            <img
                src="/img/icon/features_icon03.png"
                alt="Image 3"
                className="w-35 h-40 object-cover mb-4"
              />
              <h3 className="text-xl font-bold mb-2">BEST QUALITY PRODUCTS</h3>
              <p className="text-gray-600">
                Top-tier agricultural products renowned for their superior
                quality and adherence to stringent standards.
              </p>
            </div>
            {/* Grid Box 2 */}
            <div className="text-center p-6">
            <img
                src="/img/icon/features_icon02.png"
                alt="Image 3"
                className="w-full h-40 object-cover mb-4"
              />
              <h3 className="text-xl font-bold mb-2">
                Tracearbility and Transparency
              </h3>
              <p className="text-gray-600">
                Blockchain ensures traceability and transparency in agricultural
                processes by enabling seamless tracking of the entire supply
                chain from farm to consumer
              </p>
            </div>
            {/* Grid Box 3 */}
            <div className="text-center p-6">
              <img
                src="/img/icon/features_icon01.png"
                alt="Image 3"
                className="w-35 h-40 object-cover mb-4"
              />
              <h3 className="text-xl font-bold mb-2">
                ORGANIC FARM IMPORTANT?
              </h3>
              <p className="text-gray-600">
                Agriculture was the key development in the rise of sedentary
                human civilization, whereby farming domesticated species.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-gray-200 py-12">
        <div className="container mx-auto">
          <div className="p-8 flex flex-col items-center text-center">
            <p className="text-[#7a9c74] text-center">WHO WE ARE</p>
            <h1 className="text-4xl mt-2 font-bold mb-6 text-[#9cc623]">
              YOUR
              <span className="text-[#404a3d]"> DREAM TEAM</span>
            </h1>
            {/* <div className="w-16 h-1 bg-green-200 mb-8"></div> Divider line */}
            <img
              src={"/img/images/title_shape02.png"}
              alt="Title_Shape_image"
            />
          </div>
          <div className="mx-10 grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Team Member 1 */}
            <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow overflow-hidden">
              <div className="bg-gray-800">
                <img
                  src="/Malik.jpeg"
                  alt="Team Member 1"
                  className="w-full object-cover"
                  style={{ height: '390.89px', width: '382.4px' }}
                />
              </div>
              <div className="p-5">
                <h5 className="text-center mb-2 text-2xl font-bold tracking-tight text-gray-900">
                  Abdul Malik
                </h5>
                {/* <p className="text-center mb-3 font-normal text-gray-700">
                  Here are the biggest enterprise technology acquisitions of
                  2021 so far, in reverse chronological order.
                </p> */}
              </div>
            </div>
            {/* Team Member 2 */}
            <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow overflow-hidden">
              <div className="bg-gray-800">
                <img
                  src="/Haziq.jpeg"
                  alt="Team Member 2"
                  className="w-full object-cover"
                  style={{ height: '390.89px', width: '382.4px' }}
                />
              </div>
              <div className="p-5">
                <h5 className="text-center mb-2 text-2xl font-bold tracking-tight text-gray-900">
                  Muhammad Haziq
                </h5>
                {/* <p className="text-center mb-3 font-normal text-gray-700">
                  Here are the biggest enterprise technology acquisitions of
                  2021 so far, in reverse chronological order.
                </p> */}
              </div>
            </div>

            {/* Team Member 3 */}
            <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow overflow-hidden">
              <div className="bg-gray-800">
                <img
                  src="/Waleed.jpeg"
                  alt="Team Member 3"
                  className="w-full object-cover"
                  style={{ height: '390.89px', width: '382.4px' }}
                />
              </div>
              <div className="p-5">
                <h5 className="text-center mb-2 text-2xl font-bold tracking-tight text-gray-900">
                  Abdul Waleed
                </h5>
                {/* <p className="text-center mb-3 font-normal text-gray-700">
                  Here are the biggest enterprise technology acquisitions of
                  2021 so far, in reverse chronological order.
                </p> */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
