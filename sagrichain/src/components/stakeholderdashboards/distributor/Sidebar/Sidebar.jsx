"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Sidebar() {
  const router = useRouter();
  const [collapseShow, setCollapseShow] = useState("hidden");
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Retrieve user data from session storage or state management
    const storedUserData = sessionStorage.getItem("userData");
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }

    const handleResize = () => {
      // Reset the collapseShow state when window is resized back to full screen
      if (window.innerWidth >= 768) {
        setCollapseShow("hidden");
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleLogout = () => {
    // Function to delete a cookie by setting its max-age to 0
    const deleteCookie = (name) => {
      document.cookie = `${name}=; path=/; max-age=0; secure; sameSite=Strict`;
    };

    // Delete the cookies
    deleteCookie("role");
    deleteCookie("token");
    deleteCookie("address");

    // Redirect to the login page
    router.push("/login");
  };

  return (
    <>
      <nav className="md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl bg-white flex flex-wrap items-center justify-between relative md:w-64 z-10 py-4 px-6">
        <div className="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto">
          {/* Toggler */}
          <button
            className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
            type="button"
            onClick={() => setCollapseShow("bg-white m-2 py-3 px-6")}
          >
            <i className="fas fa-bars"></i>
          </button>
          {/* Brand */}
          <Link href="/">
            <img
              src={"/1.png"}
              className="h-[60px] w-[150px]"
              alt="SagriChain Logo"
            />
          </Link>
          {/* User */}
          <ul className="md:hidden items-center flex flex-wrap list-none">
            <li className="inline-block relative">
              {/* <NotificationDropdown /> */}
            </li>
            <li className="inline-block relative">{/* <UserDropdown /> */}</li>
          </ul>
          {/* Collapse */}
          <div
            className={
              "md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded " +
              collapseShow
            }
          >
            {/* Collapse header */}
            <div className="md:min-w-full md:hidden block pb-4 mb-4 border-b border-solid border-blueGray-200">
              <div className="flex flex-wrap">
                <div className="w-6/12 ">
                  <span className="md:block text-center md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-lg font-bold uppercase font-bold p-4 px-0">
                    <Link href="/">
                      <img
                        src={"/1.png"}
                        className="h-[60px] w-[150px]"
                        alt="SagriChain Logo"
                      />
                    </Link>
                  </span>
                </div>
                <div className="w-6/12 flex justify-end">
                  <button
                    type="button"
                    className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
                    onClick={() => setCollapseShow("hidden")}
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </div>
              </div>
            </div>
            {/* Form */}
            <form className="mt-6 mb-4 md:hidden">
              <div className="mb-3 pt-0">
                <span
                  className="block justify-self-stretch mt-4 py-2 px-4 bg-gray-100 text-[#404a3d] uppercase font-bold"
                  aria-current="page"
                >
                  {userData && <p>{userData.name}</p>}
                </span>
              </div>
            </form>

            <hr className="my-4 md:min-w-full" />
            <h6 className="md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
              Action Layout Pages
            </h6>
            <ul className="md:flex-col md:min-w-full flex flex-col list-none">
              <li className="items-center">
                <Link href="/distributor">
                  <span className="hover:bg-gray-100 hover:rounded text-xs uppercase px-2 py-3 px-1 font-bold block text-lightBlue-500 hover:text-lightBlue-600">
                    <i className="fas fa-chart-line mr-2 text-sm"></i> Dashboard
                  </span>
                </Link>
              </li>
              <li className="items-center">
                <Link href="/distributor/buyproduct">
                  <span className="hover:bg-gray-100 hover:rounded text-xs uppercase px-1 py-3 font-bold block text-lightBlue-500 hover:text-lightBlue-600">
                    <i className="fas fa-cart-plus mr-2 text-sm"></i> Buy
                    Products
                  </span>
                </Link>
              </li>
              <li className="items-center">
                <Link href="/distributor/listproduct">
                  <span className="hover:bg-gray-100 hover:rounded text-xs uppercase py-3 px-1 font-bold block text-lightBlue-500 hover:text-lightBlue-600">
                    <i className="fas fa-shopping-cart mr-2 text-sm"></i>{" "}
                    Products
                  </span>
                </Link>
              </li>
              <li className="items-center">
                <Link href="/distributor/stock">
                  <span className="hover:bg-gray-100 hover:rounded text-xs uppercase py-3 px-1 font-bold block text-lightBlue-500 hover:text-lightBlue-600">
                    <svg
                      height="12px"
                      // margin-left= "30px"
                      width="14px"
                      version="1.1"
                      id="_x32_"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      viewBox="0 0 512 512"
                      xmlSpace="preserve"
                      fill="#0284C7"
                      className="inline-block ml-1 text-sm"
                    >
                      <g id="SVGRepo_bgCarrier" strokeWidth={0}></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        <g>
                          <polygon
                            className="fill-current"
                            points="495.426,455.094 56.902,455.094 56.902,16.57 56.902,0 0,0 0,16.57 0,455.094 0,495.422 0,512 16.574,512 56.902,512 495.426,512 512,512 512,455.094 "
                          ></polygon>
                          <polygon
                            className="fill-current"
                            points="178,401.391 210,401.391 210,364.058 272.668,364.058 272.668,153.391 210,153.391 210,76.058 178,76.058 178,153.391 115.334,153.391 115.334,364.058 178,364.058 "
                          ></polygon>
                          <path
                            className="fill-current"
                            d="M378.346,337.391h32v-49.332h74.668V90.726h-74.668V33.391h-32v57.336h-74.668v197.332h74.668V337.391z M343.678,248.058V130.726h101.336v117.332H343.678z"
                          ></path>
                        </g>
                      </g>
                    </svg>{" "}
                    <span className="ml-1">Stock</span>
                  </span>
                </Link>
              </li>
            </ul>

            {/* Divider */}
            <hr className="my-4 md:min-w-full" />
            {/* Heading */}
            <h6 className="md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
              Auth Layout Pages
            </h6>
            {/* Navigation */}
            <ul className="md:flex-col md:min-w-full flex flex-col list-none md:mb-4">
              <li className="items-center">
                <Link href="/login">
                  <span
                    onClick={handleLogout}
                    className="text-blueGray-700 hover:text-blueGray-500 text-xs uppercase py-3 font-bold block cursor-pointer"
                  >
                    <i className="fas fa-fingerprint text-blueGray-400 mr-2 text-sm"></i>{" "}
                    Log out
                  </span>
                </Link>
              </li>
            </ul>

            {/* Divider */}
            <hr className="my-4 md:min-w-full" />
            {/* Heading */}
            <h6 className="md:min-w-full text-blueGray-500 text-xs uppercase  font-bold block pt-1 pb-4 no-underline">
              Explore More
            </h6>
            {/* Navigation */}
            <ul className="md:flex-col md:min-w-full flex flex-col list-none md:mb-4">
              <li className="items-center">
                <Link href="sagri">
                  <span className="hover:bg-gray-100 hover:rounded px-1 text-blueGray-700 hover:text-blueGray-500 text-xs uppercase py-3 font-bold block">
                    <i className="fas fa-newspaper text-blueGray-400 mr-2 text-sm"></i>{" "}
                    Home Page
                  </span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
