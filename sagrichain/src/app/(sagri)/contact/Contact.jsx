"use client";
import React, { useState } from "react";
import emailjs from "emailjs-com";

const Contact = () => {
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
    company: "",
    statement: ""
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const emailParams = {
      from_name: `${formData.firstName} ${formData.lastName}`,
      from_email: formData.email,
      to_email: 'abmaalik4567@gmail.com', // Recipient email
      phone: formData.phone,
      company: formData.company,
      statement: formData.statement
    };

    emailjs.send('service_plw3or9', 'template_yet24th', emailParams,'UPzYqw1qjIQTXrXrK')
      .then((result) => {
        console.log('Email sent:', result);
        alert('Email successfully sent!');
      })
      .catch((error) => {
        console.error('Error sending email:', error);
        alert('Failed to send email. Please try again later.');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div>
      {/* BREADCRUMB */}
      <div
        className="flex flex-col items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage: "url(/img/bg/breadcrumb_bg02.jpg)",
          width: "100%",
          height: "290.5px",
          opacity: "90%"
        }}
      >
        <div className="p-4 flex flex-col items-center text-center">
          <h1 className="text-4xl mt-2 font-bold mb-6 text-white">
            CONNECTING THE AGRICULTURE ECOSYSTEM
          </h1>
          <img src={"/img/images/w_title_shape.png"} alt="Title_Shape_image" />
        </div>
      </div>
      {/* BREADCRUMB END */}
      
      {/* Contact Info */}
      <div className="bg-gray-50 py-20">
        <div className="md:container md:mx-auto my-20">
          <div className="md:grid md:grid-cols-3">
            <div className="flex items-center justify-center">
              <div className="w-16 h-16 border-2 border-gray-300 rounded-full flex-shrink-0 flex items-center justify-center">
                <img src="img/icon/contact_icon01.png" alt="Phone Icon" />
              </div>
              <div className="ml-4">
                <h5 className="font-bold">Phone Number</h5>
                <span>+92311111/021-34534841</span>
              </div>
            </div>
            <div className="flex items-center justify-center mt-5 md:mt-0">
              <div className="w-16 h-16 border-2 border-gray-300 rounded-full flex-shrink-0 flex items-center justify-center">
                <img src="img/icon/contact_icon02.png" alt="Location Icon" />
              </div>
              <div className="ml-4">
                <h5 className="font-bold">Find Location</h5>
                <span>Karachi Sindh, Pakistan</span>
              </div>
            </div>
            <div className="flex items-center justify-center mt-5 md:mt-0">
              <div className="w-16 h-16 border-2 border-gray-300 rounded-full flex-shrink-0 flex items-center justify-center">
                <img src="img/icon/contact_icon03.png" alt="Mail Icon" />
              </div>
              <div className="ml-4">
                <h5 className="font-bold">Our Mail</h5>
                <span>
                  <a href="mailto:sgrichain@gmail.com">
                    sgrichain@gmail.com
                  </a>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Form */}
      <div className="bg-gray-100 py-12">
        <div className="md:container md:mx-auto my-20">
          <div className="max-w-2xl mx-auto">
            <div className="p-8 flex flex-col items-center text-center">
              <p className="text-[#7a9c74] text-center">CONTACT US</p>
              <h1 className="text-4xl mt-2 font-bold mb-6 text-[#9cc623]">
                HOW 
                <span className="text-[#404a3d]"> WE CAN HELP?</span>
              </h1>
              <img src={"/img/images/title_shape02.png"} alt="Title Shape" />
            </div>
            <form className="md:container max-w-md mx-auto" onSubmit={handleSubmit}>
              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="email"
                  name="email"
                  id="floating_email"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <label
                  htmlFor="floating_email"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:left-0 peer-focus:translate-x-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Email address
                </label>
              </div>
              <div className="grid md:grid-cols-2 md:gap-6">
                <div className="relative z-0 w-full mb-5 group">
                  <input
                    type="text"
                    name="firstName"
                    id="floating_first_name"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                  <label
                    htmlFor="floating_first_name"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:left-0 peer-focus:translate-x-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    First name
                  </label>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                  <input
                    type="text"
                    name="lastName"
                    id="floating_last_name"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                  <label
                    htmlFor="floating_last_name"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:left-0 peer-focus:translate-x-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Last name
                  </label>
                </div>
              </div>
              <div className="grid md:grid-cols-2 md:gap-6">
                <div className="relative z-0 w-full mb-5 group">
                  <input
                    type="text"
                    name="phone"
                    id="floating_phone"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                  <label
                    htmlFor="floating_phone"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:left-0 peer-focus:translate-x-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Phone Number
                  </label>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                  <input
                    type="text"
                    name="company"
                    id="floating_company"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    value={formData.company}
                    onChange={handleChange}
                    required
                  />
                  <label
                    htmlFor="floating_company"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:left-0 peer-focus:translate-x-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Company (Optional)
                  </label>
                </div>
              </div>
              <div className="relative z-0 w-full mb-5 group">
                <textarea
                  name="statement"
                  id="floating_statement"
                  rows="4"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  value={formData.statement}
                  onChange={handleChange}
                  required
                />
                <label
                  htmlFor="floating_statement"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:left-0 peer-focus:translate-x-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Your message
                </label>
              </div>
              <button
                type="submit"
                className="w-full text-white bg-[#7a9c74] hover:bg-[#98bc88] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                disabled={loading}
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
