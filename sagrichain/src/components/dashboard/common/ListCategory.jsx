"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import http from "../../../app/(dashboards)/http.js";

export default function Tables() {
  const [categories, setCategories] = useState([]);
 const [userData, setUserData] = useState(null);
  const [dashboard, setDashboard] = useState("");

  useEffect(() => {
    // Retrieve user data from session storage or state management
    const storedUserData = sessionStorage.getItem("userData");
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
      setDashboard(JSON.parse(storedUserData).dashboard);
      fetchCategories(JSON.parse(storedUserData)._id);
    }
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await http.get("/category");
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const deleteCategory = async (id) => {
    try {
      await http.delete(`/category/${id}`);
      fetchCategories(); // Refetch categories after deletion
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  return (
    <>
      <div className="px-4 md:px-10 flex flex-wrap mt-4">
        <div className="w-full mb-12 mt-20 px-4">
          <h1 className="mt-20 mb-10 font-semibold text-lg text-blueGray-700">
            Categories List
          </h1>
          <>
            <div
              className={
                "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white text-blueGray-700"
              }
            >
              <div className="rounded-t mb-0 px-4 py-3 border-0">
                <div className="flex flex-wrap items-center">
                  <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                    <h3 className="font-semibold text-lg text-blueGray-700">
                      Category Table
                    </h3>
                  </div>
                  <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                    {/* {userData && userData.role === "admin" && (
                      <Link
                        href="/admin/addcategory"
                        className="bg-lightBlue-500 text-white active:bg-lightBlue-600 text-white font-bold py-1 px-2 rounded"
                      >
                        New Category
                      </Link>
                    )} */}
                      <Link
                        href="/admin/addcategory"
                        className="bg-lightBlue-500 text-white active:bg-lightBlue-600 text-white font-bold py-1 px-2 rounded"
                      >
                        New Category
                      </Link>
                  </div>
                </div>
              </div>
              <div className="block w-full overflow-x-auto">
                <table className="items-center w-full bg-transparent border-collapse">
                  <thead>
                    <tr>
                      <th className="px-4 bg-gray-100 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                        Category ID
                      </th>
                      <th className="px-4 bg-gray-100 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                        Category Name
                      </th>
                      <th className="px-6 bg-gray-100 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {categories.map((category, index) => (
                      <tr key={category._id}>
                        <td className="border px-4 py-2 whitespace-nowrap">
                          {category._id}
                        </td>
                        <td className="border px-4 py-2 whitespace-nowrap">
                          {category.CategoryName}
                        </td>
                        <td className="border px-6 py-2 whitespace-nowrap">
                          <Link
                            href={`/${userData.role}/editcategory/${category._id}`}
                          >
                            <button className="text-blue-600 py-1 px-2 mr-2 rounded">
                              <i className="fa-solid fa-pen-to-square px-1"></i>
                            </button>
                          </Link>
                          <button
                            className="text-red-700 font-bold py-1 px-2 rounded"
                            onClick={() => {
                              if (category.id) {
                                deleteCategory(category._id);
                              } else {
                                console.error("Category ID is undefined");
                              }
                            }}
                          >
                            <i className="fas fa-trash-alt px-1"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        </div>
      </div>
    </>
  );
}
