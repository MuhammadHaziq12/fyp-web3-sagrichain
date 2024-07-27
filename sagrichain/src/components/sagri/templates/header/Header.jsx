import React from "react";
import Link from "next/link";
import {
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
} from "flowbite-react";
export default function Header() {
  return (
       <div className="container mx-auto">
            <Navbar fluid rounded>
      <NavbarBrand as={Link} href="/">
      <img src={"/1.jpeg"} className="h-[100px] w-[140px]" alt="SagriChain Logo" />
      </NavbarBrand>
      <NavbarToggle />
      <NavbarCollapse>
        <NavbarLink href="/home">
          <span
            className="block py-2 px-3 hover:bg-green-500 hover:text-white  md:bg-transparent  md:dark:text-green-500 dark:bg-green-600 md:dark:bg-transparent"
            aria-current="page"
          >
            Home
          </span>
        </NavbarLink>
        <NavbarLink as={Link} href="/about">
          <span
            className="block py-2 px-3 hover:bg-green-500 hover:text-white  md:bg-transparent  md:dark:text-green-500 dark:bg-green-600 md:dark:bg-transparent"
            aria-current="page"
          >
            About Us
          </span>
        </NavbarLink>
        <NavbarLink href="#">
        <span
            className="block py-2 px-3 hover:bg-green-500 hover:text-white  md:bg-transparent  md:dark:text-green-500 dark:bg-green-600 md:dark:bg-transparent"
            aria-current="page"
          >
            Service
          </span>
        </NavbarLink>
        <NavbarLink href="#">
          <span
            className="block py-2 px-3 hover:bg-green-500 hover:text-white  md:bg-transparent  md:dark:text-green-500 dark:bg-green-600 md:dark:bg-transparent"
            aria-current="page"
          >
            Tracebility and Transparency
          </span>
        </NavbarLink>
        <NavbarLink href="/contact">
          <span
            className="block py-2 px-3 hover:bg-green-500 hover:text-white  md:bg-transparent  md:dark:text-green-500 dark:bg-green-600 md:dark:bg-transparent"
            aria-current="page"
          >
            Contact Us​
          </span>
        </NavbarLink>
        <NavbarLink href="#stakeholders">
          <span
            
            className="block transition ease-in-out delay-150 bg-green-500 text-white py-2 px-3 rounded hover:bg-green-600 hover:-translate-y-1 hover:scale-110 duration-300"
            aria-current="page"
          >
            Register
          </span>
        </NavbarLink>
      </NavbarCollapse>
    </Navbar>
       </div>
  );
}
