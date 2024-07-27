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
      <img src={"/1.png"} className="h-[50px] w-[150px]" alt="SagriChain Logo" />
      </NavbarBrand>
      <NavbarToggle />
      <NavbarCollapse>
        <NavbarLink href="/">
          <span
            className="block mt-4 py-2 px-3 hover:rounded hover:bg-green-500 hover:text-white  md:bg-transparent  md:dark:text-green-500 dark:bg-green-600 md:dark:bg-transparent"
            aria-current="page"
          >
            Home
          </span>
        </NavbarLink>
        <NavbarLink as={Link} href="/about">
          <span
            className="block mt-4 py-2 px-3 hover:rounded hover:bg-green-500 hover:text-white  md:bg-transparent  md:dark:text-green-500 dark:bg-green-600 md:dark:bg-transparent"
            aria-current="page"
          >
            About Us
          </span>
        </NavbarLink>
        <NavbarLink as={Link} href="/#service">
          <span
            className="block mt-4 py-2 px-3 hover:rounded hover:bg-green-500 hover:text-white  md:bg-transparent  md:dark:text-green-500 dark:bg-green-600 md:dark:bg-transparent"
            aria-current="page"
          >
            Service
          </span>
        </NavbarLink>
        <NavbarLink href="/#tracktrace">
          <span
            className="block mt-4 py-2 px-3 hover:rounded hover:bg-green-500 hover:text-white  md:bg-transparent  md:dark:text-green-500 dark:bg-green-600 md:dark:bg-transparent"
            aria-current="page"
          >
            Tracebility and Transparency
          </span>
        </NavbarLink>
        <NavbarLink href="/contact">
          <span
            className="block mt-4 py-2 px-3 hover:rounded hover:bg-green-500 hover:text-white  md:bg-transparent  md:dark:text-green-500 dark:bg-green-600 md:dark:bg-transparent"
            aria-current="page"
          >
            Contact Us​
          </span>
        </NavbarLink>
        <NavbarLink href="/register">
          <span
            className="mt-4 block transition ease-in-out delay-150 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 hover:-translate-y-1 hover:scale-110 duration-300"
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
