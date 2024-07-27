"use client"
import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import Link from "next/link";
import TrackingContract from "../../../../../hardhat-contract/artifacts/contracts/TrackingSagriChain.sol/TrackingSagriChain.json";
import abiDecoder from 'abi-decoder';

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
      if (typeof window.ethereum !== 'undefined') {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS; // replace with your contract address
        const contractInstance = new ethers.Contract(contractAddress, TrackingContract.abi, signer);
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
  }, [contract]);

  const fetchAllProducts = async () => {
    try {
      const userProducts = await contract.getFarmerProducts();
      const productArray = userProducts.map(product => ({
        id: product.id.toString(),
        name: product.name,
        price: ethers.utils.formatEther(product.price),
        quantity: product.quantity.toString(),
        category: product.category,
        imageUrl: product.imageUrl // Fetch image URL directly from the contract
      }));
      return productArray;
    } catch (error) {
      console.error("Error fetching products:", error);
      return [];  // Return empty array on error
    }
  };

  useEffect(() => {
    if (contract) {
      contract.on('ProductAdded', (id, name, price, quantity, farmer, category) => {
        console.log('Product added:', { id, name, price, quantity, farmer, category });
        fetchAllProducts();  // Fetch all products again to update the list
      });
    }

    return () => {
      if (contract) {
        contract.removeAllListeners('ProductAdded');
      }
    };
  }, [contract]);

  return (
    <>
      <div className="px-4 md:px-10 flex flex-wrap mt-4">
        <div className="w-full mb-12 mt-20 px-4">
          <h1 className="mt-20 mb-10 font-semibold text-lg text-blueGray-700">
          Stock Tracker
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
                </div>
              </div>
              <div className="block w-full overflow-x-auto">
              {/* {products.length > 0 ? ( */}
                <table className="items-center w-full bg-transparent border-collapse">
                  <thead>
                    <tr>
                      <th className="px-4 bg-gray-100 text-xs align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                        Product Name
                      </th>
                      <th className="px-4 bg-gray-100 text-xs align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                        Category
                      </th>
                      <th className="px-4 bg-gray-100 text-xs align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                        Quantity
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                  {products.length > 0 ? (
                  products.map((product, index) => (
                      <tr key={product.id}>
                        <td className="border px-4 py-2 whitespace-nowrap">
                          {product.name}
                        </td>
                        <td className="border px-4 py-2 whitespace-nowrap">
                          {product.category}
                        </td>
                        <td className="border px-4 py-2 whitespace-nowrap">
                          {product.quantity}KG
                        </td>
                      </tr>
                                      ))
                                    ) : (
                                      <tr>
                                        <td colSpan="6" className="text-center py-4">
                                          No Stock Available!
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
