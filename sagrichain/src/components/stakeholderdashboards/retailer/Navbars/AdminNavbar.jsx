"use client"
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

export default function Navbar() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Retrieve user data from session storage or state management
    const storedUserData = sessionStorage.getItem("userData");
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
  }, []);

  return (
    <>
      {/* Navbar */}
      <nav className="mt-10 mb-20 absolute top-0 left-0 w-full z-10 bg-transparent md:flex-row md:flex-nowrap md:justify-start flex items-center p-4">
        <div className="w-full mx-auto items-center flex justify-between md:flex-nowrap flex-wrap md:px-10 px-4">
          {/* Welcome Message */}
          <div className="flex-grow text-blueGray-800 text-xl uppercase hidden lg:inline-block font-semibold">
            {userData && (
              <p>YOUR Address: {userData.blockchainAddress}</p>
            )}
          </div>
            {/* Brand */}
            <div>
            <a
              className="bg-blueGray-800 rounded shadow-lg text-white px-2 py-2  text-xl uppercase hidden lg:inline-block font-semibold"
              href="/retailer"
              onClick={(e) => e.preventDefault()}
            >
              <h1>RETAILER DASHBOARD</h1>
            </a>
          </div>
        </div>
      </nav>
      {/* End Navbar */}
    </>
  );
}
