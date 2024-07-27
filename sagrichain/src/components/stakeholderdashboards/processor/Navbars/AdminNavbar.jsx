import React from "react";

export default function Navbar() {
  return (
    <>
      {/* Navbar */}
      <nav className="absolute top-0 left-0 w-full z-10 bg-transparent md:flex-row md:flex-nowrap md:justify-start flex items-center p-4">
        <div className="w-full mx-autp items-center flex justify-between md:flex-nowrap flex-wrap md:px-10 px-4">
          {/* Brand */}
          <a
            className="text-blueGray-800 text-3xl uppercase hidden lg:inline-block font-semibold"
            href="#"
            onClick={(e) => e.preventDefault()}
          >
            <h1>PROCESSOR DASHBOARD</h1>
          </a>
          {/* Form */}
          <form className="md:flex hidden flex-row flex-wrap items-center lg:ml-auto mr-3">
            <div className="relative flex w-full flex-wrap items-stretch">
             {/* LOGO */}
            </div>
          </form>
        </div>
      </nav>
      {/* End Navbar */}
    </>
  );
}
