"use client"
import React from "react";

const About = () => {
  return (
    
<>
  <section
    className="breadcrumb-area breadcrumb-bg"
    data-background="/img/bg/breadcrumb_bg02.jpg"
  >
    <div className="container">
      <div className="row">
        <div className="col-12">
          <div className="breadcrumb-content">
            <h2>CONTACT US</h2>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <a href="index.html">Home</a>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Contact
                </li>
              </ol>
            </nav>
          </div>
        </div>
      </div>
    </div>
    <div className="breadcrumb-shape">
      <img src="/images/img/images/breadcrumb_shape01.png" alt="" />
    </div>
    <div className="breadcrumb-shape">
      <img src="img/images/breadcrumb_shape02.png" alt="" />
    </div>
  </section>

  <section className="contact-area">
    <div className="contact-info-wrap pt-90 pb-60">
      <div className="container">
        <div className="row justify-center justify-lg-around">
          <div className="col-xl-3 col-lg-4 col-sm-6">
            <div className="contact-info-box mb-30">
              <div className="contact-info-icon">
                <img src="img/icon/contact_icon01.png" alt="" />
              </div>
              <div className="contact-info-content">
                <h5>Phone Number</h5>
                <span>+02 5458 6598 523</span>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-lg-4 col-sm-6">
            <div className="contact-info-box mb-30">
              <div className="contact-info-icon">
                <img src="img/icon/contact_icon02.png" alt="" />
              </div>
              <div className="contact-info-content">
                <h5>Find Location</h5>
                <span>Walking Park, Angeles, NY</span>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-lg-4 col-sm-6">
            <div className="contact-info-box mb-30">
              <div className="contact-info-icon">
                <img src="img/icon/contact_icon03.png" alt="" />
              </div>
              <div className="contact-info-content">
                <h5>Our Mail</h5>
                <span>
                  <a
                    href="https://themebeyond.com/cdn-cgi/l/email-protection"
                    className="__cf_email__"
                    data-cfemail="caa3a4aca5b8a7abbea3a5a48aa3a4aca5e4a9a5a7"
                  >
                    [email protected]
                  </a>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="contact-wrap pt-120 pb-120">
      <div className="container">
        <div className="row justify-center">
          <div className="col-xl-6 col-lg-8">
            <div className="section-title text-center mb-70">
              <h6 className="sub-title">Contact Us</h6>
              <h2 className="title">
                <span>How</span> Can We Help You?
              </h2>
            </div>
          </div>
        </div>
        <div className="row justify-center">
          <div className="col-xl-10 col-lg-12">
            <div className="contact-form">
              <form action="#">
                <div className="row">
                  <div className="col-md-6">
                    <input
                      className="w-full bg-gray-200 border border-gray-300 rounded-md focus:outline-none focus:border-green-500"
                      type="text"
                      placeholder="First Name *"
                    />
                  </div>
                  <div className="col-md-6">
                    <input
                      className="w-full bg-gray-200 border border-gray-300 rounded-md focus:outline-none focus:border-green-500"
                      type="text"
                      placeholder="Last Name"
                    />
                  </div>
                  <div className="col-md-6">
                    <input
                      className="w-full bg-gray-200 border border-gray-300 rounded-md focus:outline-none focus:border-green-500"
                      type="text"
                      placeholder="Phone No"
                    />
                  </div>
                  <div className="col-md-6">
                    <input
                      className="w-full bg-gray-200 border border-gray-300 rounded-md focus:outline-none focus:border-green-500"
                      type="email"
                      placeholder="Your Email *"
                    />
                  </div>
                </div>
                <textarea
                  className="w-full bg-gray-200 border border-gray-300 rounded-md focus:outline-none focus:border-green-500"
                  name="message"
                  id="message"
                  placeholder="Message"
                  defaultValue={""}
                />
                <button className="btn gradient-btn">Send Now</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="contact-map" />
  </section>
    </>
  );
};

export default About;