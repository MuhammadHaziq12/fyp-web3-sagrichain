"use client";
import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import Link from "next/link";
import DistributorContract from "../../../../../../hardhat-contract/artifacts/contracts/TrackingSecond.sol/TrackingSecond.json";
//import abiDecoder from "abi-decoder";

export default function Tables() {
  const [products, setProducts] = useState([]);
  const [userData, setUserData] = useState(null);
  const [dashboard, setDashboard] = useState("");
  const [contract, setContract] = useState(null);

  useEffect(() => {
    const init = async () => {
      const storedUserData = sessionStorage.getItem("userData");
      if (storedUserData) {
        setUserData(JSON.parse(storedUserData));
        setDashboard(JSON.parse(storedUserData).dashboard);
        await setupBlockchainConnection();
      }
    };
    init();
  }, []);

  const setupBlockchainConnection = async () => {
    try {
      if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS; // replace with your contract address
        const contractInstance = new ethers.Contract(
          contractAddress,
          DistributorContract.abi,
          signer
        );
        setContract(contractInstance);
      } else {
        console.error("Ethereum wallet not detected!");
      }
    } catch (error) {
      console.error("Failed to setup blockchain connection:", error);
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      if (contract) {
        const newProducts = await fetchAllProducts();
        setProducts(newProducts);
      }
    };

    fetchProducts();
  }, [contract]); // Dependency array ensures this runs when contract is set or changed

  const fetchAllProducts = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const userAddress = await signer.getAddress();
      const [productDetails, quantities] =
      await contract.getWholesalerProducts(userAddress);

      const productArray = productDetails.map((product, index) => ({
        id: product.id.toString(),
        name: product.name,
        price: ethers.utils.formatEther(product.price),
        quantity: quantities[index].toString(), // Matching quantity with the product
        category: product.category,
        imageURL: `https://ipfs.io/ipfs/${product.imageHash}`,
      }));

      console.log("Processed products:", productArray);
      return productArray;
    } catch (error) {
      console.error("Error fetching products:", error);
      return []; // Return empty array on error
    }
  };
  return (
    <>
      <div className="px-4 md:px-10 flex flex-wrap mt-4">
        <div className="w-full mb-12 mt-20 px-4">
          <h1 className="mt-20 mb-10 font-semibold text-lg text-blueGray-700">
            Your Purchased Products List
          </h1>
          <>
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white text-blueGray-700">
              <div className="rounded-t mb-0 px-4 py-3 border-0">
                <div className="flex flex-wrap items-center">
                  <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                    <h3 className="font-semibold text-lg text-blueGray-700">
                      Products Table
                    </h3>
                  </div>
                  {/* <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                    {userData && userData.role === "farmer" && (
                      <Link
                        href="/farmer/addproduct"
                        className="bg-lightBlue-500 text-white active:bg-lightBlue-600 text-white font-bold py-1 px-2 rounded"
                      >
                        New Product
                      </Link>
                    )}
                  </div> */}
                </div>
              </div>
              <div className="block w-full overflow-x-auto">
                <table className="items-center w-full bg-transparent border-collapse">
                  <thead>
                    <tr>
                      <th className="px-4 bg-gray-100 text-xs align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                        Product Name
                      </th>
                      <th className="px-4 bg-gray-100 text-xs align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                        Price
                      </th>
                      <th className="px-4 bg-gray-100 text-xs align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                        Category
                      </th>
                      <th className="px-4 bg-gray-100 text-xs align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                        Product Image
                      </th>
                    </tr>
                  </thead>
                  {/* {products.length > 0 ? ( */}
                  <tbody>
                    {products.length > 0 ? (
                      products.map((product, index) => (
                        <tr key={product.id}>
                          <td className="border px-4 py-2 whitespace-nowrap">
                            {product.name}
                          </td>
                          <td className="border px-4 py-2 whitespace-nowrap">
                            PKR {product.price}
                          </td>
                          <td className="border px-4 py-2 whitespace-nowrap">
                            {product.category}
                          </td>
                          <td className="border px-4 py-2 whitespace-nowrap">
                            {product.imageURL ? (
                              <img
                                src={product.imageURL}
                                alt="Product Image"
                                className="w-20 h-10"
                              />
                            ) : (
                              "Loading..."
                            )}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" className="text-center py-4">
                          No Purchase List Available!
                        </td>
                      </tr>
                    )}
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
