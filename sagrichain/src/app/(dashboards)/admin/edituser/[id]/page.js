"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import http from "../../../http.js";

const schema = z.object({
  name: z
    .string()
    .min(1, { message: "Name is required" })
    .min(3, { message: "Name must be at least 3 characters" })
    .refine((value) => {
      // Check if the value is not a number and does not start with a number
      return isNaN(value);
    }, "Name cannot be a number"),
  role: z.string().min(1, { message: "Role is required" }),
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email("This is not a valid email."),
  cnic: z
    .string()
    .min(1, { message: "CNIC is required" })
    .refine(
      (value) => {
        const cleanedValue = value.replace(/-/g, ""); // Remove hyphens
        return cleanedValue.length === 13; // Check if the cleaned value has 13 characters
      },
      { message: "CNIC must be exactly 13 characters, excluding hyphens" }
    ),
  city: z
    .string()
    .min(1, { message: "City is required" })
    .min(3, { message: "City must be at least 3 characters" })
    .refine((value) => {
      // Check if the value is not a number and does not start with a number
      return isNaN(value);
    }, "City name cannot be a number"),
});

export default function EditUser({ params }) {
  const router = useRouter();
  const { id } = params;
  const [userData, setUserData] = useState({});
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await http.get(`/users/${id}`);
        const data = response.data;
        setUserData(data);

        // Set form values with fetched data
        setValue("name", data.name);
        setValue("role", data.role);
        setValue("email", data.email);
        setValue("cnic", data.cnic);
        setValue("city", data.city);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [id, setValue]);

  const submitForm = async (data) => {
    try {
      const response = await http.put(`/users/${id}`, data);
      console.log("User updated successfully:", response.data);
      router.push("/admin/users");
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleCnicChange = (event) => {
    let value = event.target.value.replace(/[^0-9]/g, ""); // Remove any non-digit characters

    // Format the value based on its length
    if (value.length > 12) {
      value =
        value.slice(0, 5) +
        "-" +
        value.slice(5, 12) +
        "-" +
        value.slice(12, 13);
    } else if (value.length > 5) {
      value = value.slice(0, 5) + "-" + value.slice(5);
    }

    // Limit the formatted value to the first 15 characters (including hyphens)
    value = value.slice(0, 15);

    event.target.value = value; // Set the modified value back to the input field
  };

  return (
    <div className="px-4 md:px-10 flex flex-wrap">
      <div className="mt-20 w-full lg:w-24/12 px-6">
        <h1 className="mt-20 mb-10 font-semibold text-lg text-blueGray-700">
          EDIT USER INFO
        </h1>
        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
          <div className="rounded-t bg-white mb-0 px-6 py-6">
            <div className="text-center flex justify-between">
              <h6 className="text-blueGray-700 text-xl font-bold">
                User Detail
              </h6>
            </div>
          </div>
          <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
            <form onSubmit={handleSubmit(submitForm)}>
              <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                User Information
              </h6>
              <div className="flex flex-wrap">
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="name"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      defaultValue={userData.name}
                      {...register("name")}
                      className={`border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 ${
                        errors.name ? "border-red-500" : ""
                      }`}
                      placeholder="Enter your name"
                    />
                    {errors.name && (
                      <span className="text-red-500">
                        {errors.name.message}
                      </span>
                    )}
                  </div>
                </div>
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="email"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      defaultValue={userData.email}
                      {...register("email")}
                      className={`border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 ${
                        errors.email ? "border-red-500" : ""
                      }`}
                      placeholder="Enter your email"
                    />
                    {errors.email && (
                      <span className="text-red-500">
                        {errors.email.message}
                      </span>
                    )}
                  </div>
                </div>
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="role"
                    >
                      Role
                    </label>
                    <select
                      name="role"
                      id="role"
                      defaultValue={userData.role}
                      {...register("role")}
                      disabled
                      className={`border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 ${
                        errors.role ? "border-red-500" : ""
                      }`}
                    >
                      <option value="">Select Role</option>
                      <option value="farmer">Farmer</option>
                      <option value="processor">Processor</option>
                      <option value="distributor">Distributor</option>
                      <option value="wholesaler">Wholesaler</option>
                      <option value="retailer">Retailer</option>
                    </select>
                    {errors.role && (
                      <span className="text-red-500">
                        {errors.role.message}
                      </span>
                    )}
                  </div>
                </div>
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="cnic"
                    >
                      CNIC
                    </label>
                    <input
                      type="text"
                      name="cnic"
                      id="cnic"
                      defaultValue={userData.cnic}
                      {...register("cnic")}
                      onChange={handleCnicChange}
                      className={`border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 ${
                        errors.cnic ? "border-red-500" : ""
                      }`}
                      placeholder="Enter your CNIC"
                    />
                    {errors.cnic && (
                      <span className="text-red-500">
                        {errors.cnic.message}
                      </span>
                    )}
                  </div>
                </div>
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="city"
                    >
                      City
                    </label>
                    <input
                      type="text"
                      name="city"
                      id="city"
                      defaultValue={userData.city}
                      {...register("city")}
                      className={`border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 ${
                        errors.city ? "border-red-500" : ""
                      }`}
                      placeholder="Enter your city"
                    />
                    {errors.city && (
                      <span className="text-red-500">
                        {errors.city.message}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="text-center mt-6">
                <button
                  type="submit"
                  className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
