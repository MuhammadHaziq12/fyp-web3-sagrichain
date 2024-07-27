"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
} from "flowbite-react";

export default function Header() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Retrieve user data from session storage or state management
    const storedUserData = sessionStorage.getItem("userData");
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
  }, []);

  const handleLogoutClick = () => {
    // Add your logout logic here
    // For example, clear session storage and redirect to login page
    sessionStorage.removeItem("userData");
    window.location.href = "/login";
  };

  return (
    <div className="container mx-auto">
      <Navbar fluid rounded>
        <NavbarBrand as={Link} href="/">
          <img
            src={"/1.png"}
            className="h-[50px] w-[150px]"
            alt="SagriChain Logo"
          />
        </NavbarBrand>
        <NavbarToggle />
        <NavbarCollapse>
          <span
            className="block justify-self-stretch mt-4 py-2 px-4 bg-gray-100 text-[#404a3d] uppercase font-bold"
            aria-current="page"
          >
            {userData && <p>{userData.name}</p>}
          </span>

          <NavbarLink href="#">
            <span
              onClick={handleLogoutClick}
              className="block mt-4 transition ease-in-out bg-green-500 text-white py-2 px-8 rounded hover:bg-green-600 hover:-translate-y-1 hover:scale-105 duration-150 flex items-center cursor-pointer"
              aria-current="page"
            >
              Logout
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 ml-1 transition-transform duration-300 hover:scale-x-150"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 16l4-4m0 0l-4-4m4 4H7"
                />
              </svg>
            </span>
          </NavbarLink>
        </NavbarCollapse>
      </Navbar>
    </div>
  );
}
