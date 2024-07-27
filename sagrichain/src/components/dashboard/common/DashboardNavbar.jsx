import React, { useEffect, useState } from "react";
import http from "../../../app/(dashboards)/http.js";

export default function Navbar() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await http.get("/users"); // Adjust the API endpoint as needed
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const isDashboardVisible = () => {
    return userData && (userData.role === "farmer" || userData.role === "processor");
  };

  const getDashboardName = () => {
    if (userData) {
      switch (userData.role) {
        case "admin":
          return "ADMIN DASHBOARD"  
        case "farmer":
          return "FARMER DASHBOARD";
        case "processor":
          return "PROCESSOR DASHBOARD";
        case "distributor":
          return "Distributor DASHBOARD";  
        // Add more cases for other roles
        default:
          return "";
      }
    }
    return "";
  };

  const getWelcomeMessage = () => {
    if (userData) {
      return `Welcome, ${userData.name.toUpperCase()}`;
    }
    return "";
  };

  return (
    <>
      {/* Navbar */}
      <nav className="mt-10 absolute top-0 left-0 w-full z-10 bg-transparent md:flex-row md:flex-nowrap md:justify-start flex items-center p-4">
        <div className="w-full mx-auto items-center flex justify-between md:flex-nowrap flex-wrap md:px-10 px-4">
          {/* Welcome Message */}
          <div className="flex-grow text-blueGray-800 text-xl uppercase hidden lg:inline-block font-semibold">
            {getWelcomeMessage()}
          </div>
          {/* Brand */}
          {isDashboardVisible() && (
            <div>
              <a
                className="text-blueGray-800 text-xl uppercase hidden lg:inline-block font-semibold"
                href="#"
                onClick={(e) => e.preventDefault()}
              >
                <h1>{getDashboardName()}</h1>
              </a>
            </div>
          )}
        </div>
      </nav>
      {/* End Navbar */}
    </>
  );
}
