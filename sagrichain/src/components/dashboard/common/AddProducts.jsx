"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ethers } from "ethers";
import http from "../../../app/(dashboards)/http.js";
import TrackingContract from "../../../../../hardhat-contract/artifacts/contracts/TrackingSagriChain.sol/TrackingSagriChain.json";
import { create } from "ipfs-http-client";

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

const schema = z.object({
  productName: z
    .string()
    .min(1, { message: "Product name is required" })
    .refine((value) => {
      // Check if the value is not a number and does not start with a number
      return isNaN(value);
    }, "Product name cannot be a number"),
  price: z
    .string()
    .min(1, { message: "Product price is required" })
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: "Product price must be a positive number",
    }),
  quantity: z
    .string()
    .min(1, { message: "Product quantity is required" })
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: "Product quantity must be a positive number",
    }),
  category: z.string().min(1, { message: "Category is required" }),
  // image: z
  //   .any()
  //   .refine(
  //     (files) => files?.[0]?.size <= MAX_FILE_SIZE,
  //     `Max image size is 5MB.`
  //   )
  //   .refine(
  //     (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
  //     "Only .jpg, .jpeg, .png and .webp formats are supported."
  //   ),
});

const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS; // Replace with the actual contract address

export default function AddProduct() {
  const [formData, setFormData] = useState({});
  const router = useRouter();
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [imageHash, setImageHash] = useState(null);
  const [userDataMongo, setUserDataMongo] = useState(null);
  const [userDataMeta, setUserDataMeta] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    const storedUserData = sessionStorage.getItem("userData");
    if (storedUserData) {
      const parsedData = JSON.parse(storedUserData);
      setUserDataMongo(parsedData);
      setUserDataMeta(parsedData);
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

  useEffect(() => {
    fetchCategories();
    handleImageChange();
  }, []);

  const handleImageChange = async (event) => {
    try {
      const projectId = "e2b47f0c7f8d1659e4c3";
      const projectSecret =
        "17703f5a4b6f27cdaf0997d01feb1692f973d7fef91c93ec534ad7af15847dd7";
      const url = "https://api.pinata.cloud/pinning/pinFileToIPFS";

      const imageFile = event.target.files[0];
      if (!imageFile) {
        throw new Error("No file selected");
      }

      const formData = new FormData();
      formData.append("file", imageFile);

      const response = await axios.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          pinata_api_key: projectId,
          pinata_secret_api_key: projectSecret,
        },
      });

      if (response.status === 200) {
        setImageHash(response.data.IpfsHash);
      } else {
        throw new Error(`Failed to upload image. Status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error uploading image to Pinata:", error.message);
    }
  };

  const submitForm = async (data) => {
    try {
      if (!window.ethereum) {
        console.error(
          "MetaMask not found. Please install MetaMask to use this application."
        );
        return;
      }

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const userAddress = await signer.getAddress();
      const contract = new ethers.Contract(
        contractAddress,
        TrackingContract.abi,
        signer
      );

      const priceInWei = ethers.utils.parseEther(data.price);

      const tx = await contract.addProduct(
        data.productName,
        priceInWei,
        parseInt(data.quantity),
        data.category,
        userDataMongo.role,
        imageHash
      );

      await tx.wait();
      console.log("Product added successfully:", tx);

      const receipt = await tx.wait();
      const event = receipt.events.find(
        (event) => event.event === "ProductAdded"
      );
      const productId = event.args.id.toNumber();

      console.log("Product added successfully. Product details:");
      console.log("Product ID:", productId);

      router.push(`/${userDataMongo.role}/listproduct`);
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
    <div className="px-4 md:px-10 flex flex-wrap">
      <div className="mt-20 w-full lg:w-24/12 px-6">
        <h1 className="mt-20 mb-10 font-semibold text-lg text-blueGray-700">
          ADD PRODUCT INFO
        </h1>
        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
          <div className="rounded-t bg-white mb-0 px-6 py-6">
            <div className="text-center flex justify-between">
              <h6 className="text-blueGray-700 text-xl font-bold">
                Product Detail
              </h6>
            </div>
          </div>
          <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
            <form onSubmit={handleSubmit(submitForm)}>
              <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                Put Product
              </h6>
              <div className="flex flex-wrap">
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="productName"
                    >
                      Product Name
                    </label>
                    <input
                      type="text"
                      name="productName"
                      id="productName"
                      {...register("productName")}
                      className={`border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 ${
                        errors.productName ? "border-red-500" : ""
                      }`}
                      placeholder="like: Wheat"
                    />
                    {errors.productName && (
                      <span className="text-red-500">
                        {errors.productName.message}
                      </span>
                    )}
                  </div>
                </div>
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="price"
                    >
                      Price
                    </label>
                    <input
                      type="text"
                      name="price"
                      id="price"
                      {...register("price")}
                      className={`border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 ${
                        errors.price ? "border-red-500" : ""
                      }`}
                      placeholder="like: PKR 200"
                    />
                    {errors.price && (
                      <span className="text-red-500">
                        {errors.price.message}
                      </span>
                    )}
                  </div>
                </div>
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="quantity"
                    >
                      Quantity
                    </label>
                    <input
                      type="text"
                      name="quantity"
                      id="quantity"
                      {...register("quantity")}
                      className={`border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 ${
                        errors.quantity ? "border-red-500" : ""
                      }`}
                      placeholder="like: 10"
                    />
                    {errors.quantity && (
                      <span className="text-red-500">
                        {errors.quantity.message}
                      </span>
                    )}
                  </div>
                </div>
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="category"
                    >
                      Category
                    </label>
                    <select
                      name="category"
                      id="category"
                      {...register("category")}
                      className={`border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 ${
                        errors.category ? "border-red-500" : ""
                      }`}
                    >
                      <option value="">Select Category</option>
                      {categoryOptions.map((category) => (
                        <option key={category.id} value={category.CategoryName}>
                          {category.CategoryName}
                        </option>
                      ))}
                    </select>
                    {errors.category && (
                      <span className="text-red-500">
                        {errors.category.message}
                      </span>
                    )}
                  </div>
                </div>
                {/* <div className="w-full lg:w-6/12 px-4"> */}
                <div className="w-full lg:w-12/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="image"
                    >
                      Product Image
                    </label>
                    <input
                      type="file"
                      name="image"
                      id="image"
                      className={`border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 ${
                        errors.image ? "border-red-500" : ""
                      }`}
                      onChange={handleImageChange}
                    />
                    {errors.image && (
                      <span className="text-red-500">
                        {errors.image.message}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="text-center mt-6">
                <button
                  type="submit"
                  className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                >
                  Add Product
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
