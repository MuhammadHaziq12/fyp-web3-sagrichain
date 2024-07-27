"use client";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import http from "../../../app/(dashboards)/http.js";

const schema = z.object({
  categoryName: z.string().nonempty("Category Name is required"),
});

export default function Settings() {
  // const navigate = useNavigate();
  const router = useRouter();
  const [categoryOptions, setCategoryOptions] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    // Retrieve user data from session storage or state management
    const storedUserData = sessionStorage.getItem("userData");
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await http.get("/category");
      setCategoryOptions(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  // client-side code
  const submitForm = async (data) => {
    try {
      // Generate a unique ID; for example, using a timestamp
      const id = Date.now();
  
      // Post the category with ID and name
      const response = await http.post("/category", { id, CategoryName: data.categoryName });
  
      if (response.status === 201) {
        // Fetch categories again to update the list
        fetchCategories();
        // Navigate to the category list page
        router.push(`/${userData.role}/listcategory`);
        // Notify user of successful addition
        alert("Category added successfully!");
      }
    } catch (error) {
      console.error('Error adding category:', error);
      // Notify user of failure
      alert("Error adding category: " + (error.response?.data?.message || error.message));
    }
  };
  
  const [userData, setUserData] = useState(null);

  return (
    <>
      <div className="px-4 md:px-10 flex flex-wrap">
        <div className="mt-20 w-full lg:w-24/12 px-6">
          <h1 className="mt-20 mb-10 font-semibold text-lg text-blueGray-700">
            ADD NEW CATEGORY
          </h1>
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
            <div className="rounded-t bg-white mb-0 px-6 py-6">
              <div className="text-center flex justify-between">
                <h6 className="text-blueGray-700 text-xl font-bold">
                  Category Detail
                </h6>
              </div>
            </div>
            <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
              <form onSubmit={handleSubmit(submitForm)}>
                <div className="flex flex-wrap">
                  <div className="w-full lg:w-6/24 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="mt-4 block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="categoryName"
                      >
                        Category Name
                      </label>
                      <input
                        type="text"
                        name="categoryName"
                        id="categoryName"
                        {...register("categoryName")}
                        className={`border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 ${
                          errors.CategoryName ? "border-red-500" : ""
                        }`}
                        placeholder="Enter category name"
                      />
                      {errors.categoryName && (
                        <span className="text-red-500">
                          {errors.categoryName.message}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="text-center flex justify-between">
                  <button
                    type="submit"
                    className="bg-green-600  active:bg-green-500  text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                  >
                    Add Category
                  </button>
                </div>
              </form>
              {/* {errors.categoryName && (
                <div className="text-red-500 mt-2">
                  {errors.categoryName.message}
                </div>
              )} */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
