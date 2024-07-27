import React, { useState, useEffect } from "react";
import http from "../../../app/(dashboards)/http.js";
import { ethers } from "ethers";
import Link from "next/link";
import DistributorContract from "../../../../../hardhat-contract/artifacts/contracts/TrackingSecond.sol/TrackingSecond.json";

const distributorContractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;

export default function BuyProduct1() {
  const [products, setProducts] = useState([]);
  const [userData, setUserData] = useState(null);
  const [productQuantities, setProductQuantities] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [productHistory, setProductHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);

  useEffect(() => {
    const storedUserData = sessionStorage.getItem("userData");
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
      fetchProducts();
    }
  }, []);

  const fetchProducts = async () => {
    try {
      if (!window.ethereum) throw new Error("No crypto wallet found");
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        distributorContractAddress,
        DistributorContract.abi,
        signer
      );
      const products = await contract.getRetailerProductsForConsumer();
      const formattedProducts = products.map((product) => ({
        id: product.id.toString(),
        name: product.name,
        price: ethers.utils.formatUnits(product.price, "ether"),
        quantity: product.quantity.toString(),
        category: product.category,
        userID: product.farmer,
        imageURL: `https://ipfs.io/ipfs/${product.imageHash}`,
      })).filter((product) => parseInt(product.quantity) > 0);;
      const validProducts = formattedProducts.filter(
        (product) => product.id !== "0"
      );
      setProducts(validProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const incrementQuantity = (productId) => {
    setProductQuantities((prev) => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1,
    }));
  };

  const decrementQuantity = (productId) => {
    setProductQuantities((prev) => ({
      ...prev,
      [productId]: Math.max(0, (prev[productId] || 0) - 1),
    }));
  };

  const buyProduct = async (productId) => {
    try {
      if (!window.ethereum) throw new Error("No crypto wallet found");
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        distributorContractAddress,
        DistributorContract.abi,
        signer
      );

      const selectedQuantity = productQuantities[productId];
      const product = products.find((p) => p.id === productId);

      if (selectedQuantity === undefined || selectedQuantity === 0) {
        alert("Quantity is not selected.");
        return;
      }

      if (selectedQuantity > parseInt(product.quantity)) {
        alert("Quantity exceeds the available limit.");
        return;
      }

      const role = userData.role;
      const transaction = await contract.buyProductFromFarmer(
        productId,
        selectedQuantity,
        role
      );
      await transaction.wait();
      console.log("Product bought:", transaction);

      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === productId
            ? { ...product, quantity: product.quantity - selectedQuantity }
            : product
        )
      );

      fetchProducts();
    } catch (error) {
      console.error("Error buying product:", error);
    }
  };

  const viewProductDetails = (productId) => {
    const product = products.find((p) => p.id === productId);
    setCurrentProduct(product);
    setProductHistory([]);
    setModalOpen(true);
    setShowHistory(false);
  };

  const trackHistory = async (productId) => {
    if (!currentProduct || currentProduct.id !== productId) {
      viewProductDetails(productId);
    }
    try {
      if (!window.ethereum) throw new Error("No crypto wallet found");
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        distributorContractAddress,
        DistributorContract.abi,
        signer
      );

      const history = await contract.traceAndTrack(productId);

      const formattedHistory = history.map((entry) => ({
        buyer: entry.buyer,
        role: entry.role,
        referenceProductId: entry.referenceProductId.toNumber(),
        mainProductId: entry.mainProductId.toNumber(),
        timestamp: new Date(entry.timestamp.toNumber() * 1000).toLocaleString(),
      }));

      // Remove duplicate history entries and keep the latest timestamp
      const uniqueHistory = {};
      formattedHistory.forEach((entry) => {
        const key = `${entry.buyer}-${entry.role}`;
        if (
          !uniqueHistory[key] ||
          new Date(entry.timestamp) > new Date(uniqueHistory[key].timestamp)
        ) {
          uniqueHistory[key] = entry;
        }
      });

      const sortedHistory = Object.values(uniqueHistory).sort((a, b) => {
        const roleOrder = ["farmer", "distributor", "wholesaler", "retailer"];
        return roleOrder.indexOf(a.role) - roleOrder.indexOf(b.role);
      });

      setProductHistory(sortedHistory);
      setShowHistory(true);
      console.log(`History for product ${productId}:`, sortedHistory);
    } catch (error) {
      console.error("Error tracking history:", error);
    }
  };

  const closeModal = () => {
    setModalOpen(false);
    setShowHistory(false);
  };

  const goBackToDetails = () => {
    setShowHistory(false);
  };

  return (
    <div className="bg-[#f1f5f9]">
      <div className="container mx-auto p-4">
        <div className="p-8 flex flex-col items-center text-center mt-16">
        <p className="text-[#7a9c74] text-center">Discover SAGRICHAIN - Your Secure and Transparent Agriculture Marketplace</p>
          <h1 className="text-4xl mt-2 font-bold mb-2 text-[#9cc623]">
          MARKET<span className="text-[#404a3d]">PLACE</span>
          </h1>
          <img src={"/title_shape.png"} alt="Title Shape" />
        </div>
        <div className="flex justify-end items-center mt-16 mb-24">
          <Link href="/market/store">
            <span className="bg-blue-gray-800 text-white font-semibold px-6 py-2 rounded hover:bg-[#7e9721] active:bg-[#667d1b] transition duration-300">
              Purchased History
            </span>
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10 mb-32">
          {products.map((product) => (
            <div
              key={product.id}
              className="w-full bg-white rounded overflow-hidden shadow-lg transition-shadow duration-300 hover:shadow-xl"
            >
              <div
                className="h-48 w-full bg-gray-200 flex flex-col justify-between p-2 bg-cover bg-center"
                style={{
                  backgroundImage: `url(${product.imageURL})`,
                }}
              >
                <div className="flex justify-end">
                  <button
                    onClick={() => viewProductDetails(product.id)}
                    className="bg-black text-white p-2 rounded-xl bg-opacity-50 hover:bg-opacity-75 transition duration-300"
                  >
                    Details
                  </button>
                </div>
              </div>
              <div className="p-4 bg-[#fff]">
                <h3 className="text-lg font-semibold mb-2 text-center flex justify-center items-stretch uppercase">
                  {product.name}
                </h3>

                <div className="flex items-center justify-between mb-4">
                  <p className="text-gray-600">Qty: {product.quantity}</p>
                  <div className="flex items-center">
                    <button
                      onClick={() => decrementQuantity(product.id)}
                      className="bg-gray-200 text-gray-600 px-2 py-1 rounded-l hover:bg-gray-300"
                    >
                      -
                    </button>
                    <span className="px-4 py-2 border-t border-b border-gray-200">
                      {productQuantities[product.id] || 0}
                    </span>
                    <button
                      onClick={() => incrementQuantity(product.id)}
                      className="bg-gray-200 text-gray-600 px-2 py-1 rounded-r hover:bg-gray-300"
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => buyProduct(product.id)}
                  className="py-2 px-4 bg-green-700 hover:bg-green-800 text-white rounded active:bg-green-700 disabled:opacity-50 mt-4 w-full flex items-center justify-center"
                >
                  Add to order
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 ml-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
        {/* Modal Starts Here */}
        {/* Modal Starts Here */}
        {modalOpen && currentProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity">
            <div className="relative bg-white p-6 rounded-lg shadow-2xl mx-4 md:mx-auto my-8 w-full max-w-lg md:max-w-1xl">
              <button
                onClick={closeModal}
                className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              {!showHistory ? (
                <div>
                  <h2 className="text-2xl font-semibold mb-6 text-center border-b pb-4">
                    Product Details
                  </h2>
                  <div className="grid grid-cols-1 gap-y-4 md:grid-cols-2 md:gap-x-4">
                    <div className="md:text-right">
                      <p className="font-medium text-gray-600 pr-11" style={{ paddingRight: "2.9rem" }}>
                        Product Name:
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-800 ml-12">
                        {currentProduct.name}
                      </p>
                    </div>

                    <div className="md:text-right">
                      <p
                        className="font-medium text-gray-600"
                        style={{ paddingRight: "3.1rem" }}
                      >
                        Per Unit Price:
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-800 ml-12">
                        PKR {currentProduct.price}
                      </p>
                    </div>
                    <div className="md:text-right">
                      <p className="font-medium text-gray-600 pr-6">
                        Product Quantity:
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-800 ml-12">
                        {currentProduct.quantity} KG
                      </p>
                    </div>

                    <div className="md:text-right">
                      <p className="font-medium text-gray-600 pr-5" style={{ paddingRight: "1.1rem" }}>
                        Product Category:
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-800 ml-12">
                        {currentProduct.category}
                      </p>
                    </div>
                    <div className="col-span-2 flex justify-center"></div>
                  </div>
                  <div className="flex justify-center mt-6">
                    <button
                      onClick={() => trackHistory(currentProduct.id)}
                      className="flex items-center py-2 px-4 bg-green-700 hover:bg-green-800 text-white rounded text-sm font-semibold transition duration-200 ease-in-out shadow hover:shadow-lg"
                    >
                      <svg
                        viewBox="-4 0 32 32"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        className="h-4 w-4 mr-2"
                      >
                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                        <g
                          id="SVGRepo_tracerCarrier"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></g>
                        <g id="SVGRepo_iconCarrier">
                          <g
                            id="Page-1"
                            stroke="#fafafa"
                            strokeWidth="1"
                            fill="#fafafa"
                            fillRule="evenodd"
                          >
                            <g
                              id="Icon-Set-Filled"
                              transform="translate(-106.000000, -413.000000)"
                              className="text-blue-500"
                            >
                              <path
                                d="M118,422 C116.343,422 115,423.343 115,425 C115,426.657 116.343,428 118,428 C119.657,428 121,426.657 121,425 C121,423.343 119.657,422 118,422 L118,422 Z M118,430 C115.239,430 113,427.762 113,425 C113,422.238 115.239,420 118,420 C120.761,420 123,422.238 123,425 C123,427.762 120.761,430 118,430 L118,430 Z M118,413 C111.373,413 106,418.373 106,425 C106,430.018 116.005,445.011 118,445 C119.964,445.011 130,429.95 130,425 C130,418.373 124.627,413 118,413 L118,413 Z"
                                id="location"
                              ></path>
                            </g>
                          </g>
                        </g>
                      </svg>
                      Track History
                    </button>
                  </div>
                </div>
              ) : (
                <div className="max-w-lg md:max-w-2xl mx-auto">
                  <h2 className="text-2xl font-semibold mb-4 text-center">
                    Product History
                  </h2>
                  <div className="relative mt-2">
                    {productHistory.map((entry, index) => (
                      <div key={index} className="mb-2">
                        <div className="flex items-center">
                          {/* <svg
                            viewBox="-4 0 32 32"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            className="h-4 w-4"
                          >
                            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                            <g
                              id="SVGRepo_tracerCarrier"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            ></g>
                            <g id="SVGRepo_iconCarrier">
                              <title>location</title>
                              <desc>Created with Sketch Beta.</desc>
                              <g
                                id="Page-1"
                                stroke="#74C0FC"
                                strokeWidth="1"
                                fill="#74C0FC"
                                fillRule="evenodd"
                              >
                                <g
                                  id="Icon-Set-Filled"
                                  transform="translate(-106.000000, -413.000000)"
                                >
                                  <path
                                    d="M118,422 C116.343,422 115,423.343 115,425 C115,426.657 116.343,428 118,428 C119.657,428 121,426.657 121,425 C121,423.343 119.657,422 118,422 L118,422 Z M118,430 C115.239,430 113,427.762 113,425 C113,422.238 115.239,420 118,420 C120.761,420 123,422.238 123,425 C123,427.762 120.761,430 118,430 L118,430 Z M118,413 C111.373,413 106,418.373 106,425 C106,430.018 116.005,445.011 118,445 C119.964,445.011 130,429.95 130,425 C130,418.373 124.627,413 118,413 L118,413 Z"
                                    id="location"
                                  ></path>
                                </g>
                              </g>
                            </g>
                          </svg> */}
                          <span className="mr-2 ml-1">📍</span>
                          <div className="flex-grow border-t-2 border-gray-200"></div>
                        </div>
                        <div className="ml-2 pl-2 pt-0 break-words md:break-normal border-l-2 border-dashed border-blue-500">
                          <p>
                            <strong>Id:</strong> {entry.buyer}
                          </p>
                          <p>
                            <strong>Role:</strong>{" "}
                            <span className="uppercase italic">
                              {entry.role}
                            </span>
                          </p>
                          <p>
                            <strong>Timestamp:</strong> {entry.timestamp}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-center mt-6">
                    <button
                      onClick={() => setShowHistory(false)}
                      className="py-2 px-4 bg-gray-500 text-white rounded hover:bg-gray-600 active:bg-gray-700 text-sm font-semibold transition duration-200 ease-in-out shadow hover:shadow-lg"
                    >
                      {/* <i className="fa fa-arrow-left mr-2"></i> */}
                      <span className="mr-2">←</span>Go Back
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
        {/* Modal End */}
      </div>
    </div>
  );
}
