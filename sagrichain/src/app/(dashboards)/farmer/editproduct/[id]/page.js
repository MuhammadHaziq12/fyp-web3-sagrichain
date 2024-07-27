"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Corrected import
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ethers } from "ethers";
import TrackingSagriChain from "../../../../../../../truffle-contracts/build/contracts/TrackingSagriChain.json";

const schema = z.object({
  productName: z.string().nonempty("Product Name is required"),
  price: z.string().nonempty("Price is required"),
  quantity: z.string().nonempty("Quantity is required"),
});

const contractAddress = "0x2b9cCA161f9C217687296C3538CfF012B35abCC3";

export default function EditProduct({ params }) {
  const router = useRouter();
  const { id } = params;
  const [product, setProduct] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: zodResolver(schema),
  });
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const storedUserData = sessionStorage.getItem("userData");
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
      fetchProductFromBlockchain(parseInt(id));
    } else {
      router.push("/login");
    }
  }, [id, router]);

  const fetchProductFromBlockchain = async (productId) => {
    try {
      if (!window.ethereum) {
        console.error("MetaMask not found. Please install MetaMask to use this application.");
        return;
      }

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, TrackingSagriChain.abi, signer);
      console.log("Fetching product with ID:", productId);

      const product = await contract.getProduct(productId);
      setProduct(product);
      console.log("Fetched product:", product);

      setValue("productName", product[0]);
      setValue("price", ethers.utils.formatUnits(product[1], "ether")); // Convert from Wei to Ether
      setValue("quantity", product[2].toString()); // Ensure quantity is a string
    } catch (error) {
      console.error("Failed to fetch product from the blockchain:", error);
    }
  };

  const submitForm = async (data) => {
    try {
      if (!window.ethereum) {
        console.error("MetaMask not found. Please install MetaMask to use this application.");
        return;
      }

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, TrackingSagriChain.abi, signer);

      // Convert price to Wei (assuming price is in Ether)
      const priceInWei = ethers.utils.parseUnits(data.price, "ether");

      await contract.editProduct(
        parseInt(id),
        data.productName,
        priceInWei,
        parseInt(data.quantity)
      );

      alert("Product updated successfully!");
      router.push("/products");
    } catch (error) {
      console.error("Error updating product on blockchain:", error);
    }
  };

  return (
    <>
      <div className="px-4 md:px-10 flex flex-wrap">
        <div className="mt-20 w-full lg:w-24/12 px-6">
          <h1 className="mt-20 mb-10 font-semibold text-lg text-blueGray-700">
            EDIT PRODUCT INFO
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
                        className={`border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 ${errors.productName ? "border-red-500" : ""}`}
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
                        className={`border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 ${errors.price ? "border-red-500" : ""}`}
                        placeholder="like: 200"
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
                        className={`border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 ${errors.quantity ? "border-red-500" : ""}`}
                        placeholder="like: 2"
                      />
                      {errors.quantity && (
                        <span className="text-red-500">
                          {errors.quantity.message}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <button
                  className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                  type="submit"
                >
                  Update
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
