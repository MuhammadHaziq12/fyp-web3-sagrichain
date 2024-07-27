"use client"
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import http from "../../app/(dashboards)/http.js";
// import emailjs from '@emailjs/browser';
import emailjs from 'emailjs-com';

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
      { message: "CNIC must be exactly 13 characters" }
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

const RegisterForm = () => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState(null);
  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });
  

  //   const onSubmit = (data) => {
  //     console.log(data);

  //   http.post("/users/signup", data)
  //     .then((response) => {
  //       console.log(response.data);
  //       router.push("/login")
  //     })
  //     .catch((error) => {
  //       console.error("Signup failed:", error.response.data.message); // Handle signup failure
  //     });
  // };
  // function validateEmail(email) {
  //   if (!email) return "Email is required";
  //   if (!/@/.test(email)) return "Email must include '@' symbol";
  //   if (!/\.[a-z]{2,}$/.test(email)) return "Email must include a domain name (like .com)";
  //   if (!/^[^@]+@[^@]+\.[^@]+$/.test(email)) return "Invalid email format";
  //   return null;  // No error
  // }
  const onSubmit = async (data) => {
    try {
      const response = await http.post("/users/signup", data);
      const privateKey = response.data.privateKey;
      const userEmail = response.data.email;

      const emailParams = {
        from_name: 'SAGRICHAIN - SECRET KEY',
        from_email: 'sagrichain@gmail.com',
        to_email: userEmail,
        message: `Your Blockchain/Private  ID : ${privateKey}`
      };

      await emailjs.send('service_8bl1dn6', 'template_4aet22g', emailParams, 'ns5OIIKKswXM-g_J5');
      router.push("/login");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrorMessage("User already exists with this email");
      } else {
        console.error("Signup failed:", error);
        setErrorMessage("An error occurred during sign up");
      }
    }
  };

const handleCnicChange = (event) => {
  let value = event.target.value.replace(/[^0-9]/g, ''); // Remove any non-digit characters

  // Format the value based on its length
  if (value.length > 12) {
    value = value.slice(0, 5) + '-' + value.slice(5, 12) + '-' + value.slice(12, 13);
  } else if (value.length > 5) {
    value = value.slice(0, 5) + '-' + value.slice(5);
  }

  // Limit the formatted value to the first 15 characters (including hyphens)
  value = value.slice(0, 15);

  event.target.value = value; // Set the modified value back to the input field
};


  return (
    <div className="bg-green-200 flex flex-col items-center justify-center min-h-screen">
      <form
        className="w-[50rem] mt-10 mb-10 max-w-full bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <center>
          <img
            src="/1.png"
            className="h-[60px] w-[150px] items-center"
            alt="SagriChain Logo"
          />
        </center>
        <h2 className="text-xl font-bold mt-4 mb-6 text-center">
          Create New Account
        </h2>
        <div className="flex flex-wrap -mx-3 mb-4">
          {/* Name */}
          <div className="w-full md:w-1/2 px-3 mb-4 md:mb-0">
            <label htmlFor="name" className="block text-sm font-bold mb-2">
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your Name"
              className="w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:border-blue-500"
              {...register("name")}
            />
            {errors.name && <p className="text-red-500">{errors.name.message}</p>}
          </div>
          {/* Role */}
          <div className="w-full md:w-1/2 px-3 mb-4 md:mb-0">
            <label htmlFor="role" className="block text-sm font-bold mb-2">
              Role:
            </label>
            <select
              id="role"
              name="role"
              className="w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:border-blue-500"
              {...register("role")}
            >
              <option value="">Select Role</option>
              <option value="farmer">Farmer</option>
              <option value="processor">Processor</option>
              <option value="distributor">Distributor</option>
              <option value="wholesaler">Wholesaler</option>
              <option value="retailer">Retailer</option>
              <option value="consumer">Consumer</option>
            </select>
            {errors.role && <span className="text-red-500">{errors.role.message}</span>}
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-4">
          {/* Email */}
          <div className="w-full md:w-1/2 px-3 mb-4 md:mb-0">
            <label htmlFor="email" className="block text-sm font-bold mb-2">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your Email Address"
              className="w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:border-blue-500"
              {...register("email")}
            />
            {errors.email && <p className="text-red-500">{errors.email.message}</p>}
          </div>
          {/* CNIC */}
          <div className="w-full md:w-1/2 px-3 mb-4 md:mb-0">
            <label htmlFor="cnic" className="block text-sm font-bold mb-2">
              CNIC:
            </label>
            <input
              type="text"
              id="cnic"
              name="cnic"
              placeholder="4XXXX-0XXXYYY-0"
              className="w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:border-blue-500"
               {...register("cnic")} onChange={handleCnicChange}  maxLength="15"
            />
            {errors.cnic && <p className="text-red-500">{errors.cnic.message}</p>}
          </div>
        </div>
        {/* City */}
        <div className="mb-4">
          <label htmlFor="city" className="block text-sm font-bold mb-2">
            City:
          </label>
          <input
            type="text"
            id="city"
            name="city"
            placeholder="Enter City Name"
            className="w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:border-blue-500"
            {...register("city")}
          />
          {errors.city && <p className="text-red-500">{errors.city.message}</p>}
        </div>
        
         
        <div className="mb-4">
          <button
            type="submit"
            className="bg-green-700 hover:bg-green-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
          >
            SIGN UP
          </button>
          {errorMessage && (
          <div className="mb-4 text-red-500 text-center">{errorMessage}</div>
        )}
        </div>
      </form>
      <p className="mt-4">
        Already have an account?{" "}
        <a href="/login" className="text-blue-500">
          Login here
        </a>
      </p>
    </div>
  );
};

export default RegisterForm;