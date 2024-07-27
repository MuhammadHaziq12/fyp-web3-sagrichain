"use client";
import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import DistributorContract from "../../../../../../hardhat-contract/artifacts/contracts/TrackingSagriChain.sol/TrackingSagriChain.json";
import http from "../../../../app/(dashboards)/http.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const distributorContractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS; // Replace with your DistributorContract address

export default function Tables() {
  const [products, setProducts] = useState([]);
  const [productQuantities, setProductQuantities] = useState({});
  const [userData, setUserData] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [productHistory, setProductHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);

  useEffect(() => {
    const storedUserData = sessionStorage.getItem("userData");
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
      fetchFarmerProducts();
    }
  }, []);

  const incrementQuantity = (productId) => {
    setProductQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: (prevQuantities[productId] || 0) + 1,
    }));
  };

  const decrementQuantity = (productId) => {
    setProductQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: Math.max((prevQuantities[productId] || 1) - 1, 1),
    }));
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
        if (!uniqueHistory[key] || new Date(entry.timestamp) > new Date(uniqueHistory[key].timestamp)) {
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

  const fetchFarmerProducts = async () => {
    try {
      if (!window.ethereum) throw new Error("No crypto wallet found");
      await window.ethereum.send("eth_requestAccounts");
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        distributorContractAddress,
        DistributorContract.abi,
        signer
      );

      const products = await contract.getDistributorProductsForWholesaler();

      // Convert BigNumber fields to plain numbers or strings
      const formattedProducts = products
        .map((product) => ({
          id: product.id.toString(),
          name: product.name,
          price: ethers.utils.formatUnits(product.price, "ether"), // assuming price is in wei
          quantity: product.quantity.toString(),
          category: product.category,
          ownerID: product.ownerID, // assuming farmer's address is the user ID
          BID: product.buyerID, // assuming farmer's address is the user ID
          ownerRole: product.ownerRole, // assuming farmer's address is the user ID
          buyerRole: product.buyerRole, // assuming farmer's address is the user ID
          status: product.status,
          productReferenceID: product.productReferenceID,
          imageURL: `https://ipfs.io/ipfs/${product.imageHash}`,
        }))
        .filter((product) => parseInt(product.quantity) > 0);

      setProducts(formattedProducts);
      console.log("Fetched products:", formattedProducts);
    } catch (error) {
      console.error("Error fetching farmer products:", error);
    }
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
      if (selectedQuantity === undefined) {
        alert("Quantity not selected.");
        return;
      }
      if (selectedQuantity <= 0) {
        alert("Please select a quantity before buying.");
        return;
      }
      if (selectedQuantity > parseInt(currentProduct.quantity)) {
        alert("Quantity exceeds the available limit.");
        return;
      }
  
      const role = userData.role;
      const transaction = await contract.buyProductFromFarmer(
        productId,
        selectedQuantity,
        role
      ); // Modify contract method if needed
      await transaction.wait();
      console.log("Product bought:", transaction);
  
      // Update the displayed quantity of the product
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === productId
            ? { ...product, quantity: product.quantity - selectedQuantity }
            : product
        )
      );
  
      // Update the current product's quantity in the modal
      if (currentProduct && currentProduct.id === productId) {
        setCurrentProduct((prevProduct) => ({
          ...prevProduct,
          quantity: prevProduct.quantity - selectedQuantity,
        }));
      }
  
      // Reset the counter amount to zero
      setProductQuantities((prevQuantities) => ({
        ...prevQuantities,
        [productId]: 0,
      }));
  
      fetchFarmerProducts(); // Refresh the products list
    } catch (error) {
      console.error("Error buying product:", error);
    }
  };
  

  const closeModal = () => {
    setModalOpen(false);
    setShowHistory(false);
  };

  return (
    <div className="px-4 md:px-10 flex flex-wrap mt-4">
      <div className="w-full mb-12 mt-20 px-4">
        <h1 className="mt-20 mb-10 font-semibold text-lg text-blueGray-700">
          Buy Product
        </h1>
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
            <table className="items-center w-full bg-transparent border-collapse">
              <thead>
                <tr>
                  <th className="px-4 bg-gray-100 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Product Name
                  </th>
                  <th className="px-4 bg-gray-100 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Image
                  </th>
                  <th className="px-4 bg-gray-100 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Distributor's ID
                  </th>
                  <th className="px-4 bg-gray-100 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {products.length > 0 ? (
                  products.map((product, index) => (
                    <tr key={index}>
                      <td className="border py-2 align-middle text-xs whitespace-nowrap p-2">
                        {product.name}
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

                      <td className="border py-2 align-middle text-xs whitespace-nowrap p-2">
                        {product.ownerID}
                      </td>
                      <td className="border py-2 align-middle text-xs whitespace-nowrap p-2">
                        <button
                          onClick={() => {
                            viewProductDetails(product.id);
                            setModalOpen(true);
                          }}
                          className="bg-[#00ace6] hover:bg-[#00ace6] text-white font-bold py-2 px-4 border-custom-red active:border-red rounded ml-2"
                        >
                        <i class="fa-sharp fa-light fa-location-plus"></i>
                          Track Product
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center py-4">
                      No Products Available!
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

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
                    <p className="font-medium text-gray-600 pr-11">
                      Product Name:
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-800 ml-12">{currentProduct.name}</p>
                  </div>

                  <div className="md:text-right">
                    <p className="font-medium text-gray-600" style={{ paddingRight: '3.2rem' }}>
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
                    <p className="font-medium text-gray-600 pr-5">
                      Product Category:
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-800 ml-12">
                      {currentProduct.category}
                    </p>
                  </div>

                  <div className="col-span-2 flex justify-center mt-4">
                    <button
                      onClick={() => decrementQuantity(currentProduct.id)}
                      className="bg-white rounded-l border text-gray-600 hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50 inline-flex items-center px-2 py-1 border-r border-gray-200"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M20 12H4"
                        />
                      </svg>
                    </button>
                    <div className="bg-gray-200 border-t border-b border-gray-200 text-gray-600 hover:bg-gray-100 inline-flex items-center px-4 py-2 select-none">
                      {productQuantities[currentProduct.id] || 0}
                    </div>
                    <button
                      onClick={() => incrementQuantity(currentProduct.id)}
                      className="bg-white rounded-r border text-gray-600 hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50 inline-flex items-center px-2 py-1 border-r border-gray-200"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 4v16m8-8H4"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="flex justify-between mt-6">
                  <button
                    onClick={() => trackHistory(currentProduct.id)}
                    className="py-2 px-4 bg-green-700 hover:bg-green-800 text-white rounded  text-sm font-semibold transition duration-200 ease-in-out shadow hover:shadow-lg"
                  >
                    <i class="fa-sharp fa-solid fa-location-dot mr-2"></i>
                    Track History
                  </button>
                  <button
                    onClick={() => buyProduct(currentProduct.id)}
                    className="py-2 px-4 bg-[#dc3545]  active:color-[#fff]  active:bg-[#b02a37] hover:bg-[#bb2d3b] text-white font-bold rounded text-sm font-semibold transition duration-200 ease-in-out shadow hover:shadow-lg"
                  >
                    <i className="fas fa-cart-plus mr-2"></i>
                    Buy Product
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
                    <div key={index} className="mb-4">
                      <div className="flex items-center">
                        <i
                          class="fa-sharp fa-solid fa-location-dot mr-1 ml-1"
                          style={{ color: "#74C0FC", width: "10px" }}
                        ></i>
                        <div className="flex-grow border-t-2 border-gray-200"></div>
                      </div>
                      <div className="ml-2 pl-2 pt-4 break-words md:break-normal border-l-2 border-dashed border-blue-500">
                        <p>
                          <strong>Id:</strong> {entry.buyer}
                        </p>
                        <p>
                          <strong>Role:</strong>{" "}
                          <span className="uppercase italic">{entry.role}</span>
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
                    <i class="fa fa-arrow-left mr-2" aria-hidden="true"></i>
                    Go Back
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
