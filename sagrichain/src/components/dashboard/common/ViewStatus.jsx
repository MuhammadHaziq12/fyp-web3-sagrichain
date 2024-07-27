"use client"
import React, { useState, useEffect } from "react";
import http from "../../../app/(dashboards)/http.js";

export default function Tables() {
  const [orders, setOrders] = useState([]);
  const [userData, setUserData] = useState(null);
  const [contract, setContract] = useState(null);

  useEffect(() => {
    const storedUserData = sessionStorage.getItem("userData");
    if (storedUserData) {
      const parsedUserData = JSON.parse(storedUserData);
      setUserData(parsedUserData);
      fetchOrders(parsedUserData._id); // Pass userData._id to fetchOrders
    }
  }, []);

  const setupContract = () => {
    // Setup ethers provider
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const trackingContract = new ethers.Contract(contractAddress, TrackingContractABI, signer);
    setContract(trackingContract);
  };

  const viewStatusForFarmer = async (productId) => {
    if (!contract) return;

    try {
      const result = await contract.viewStatusForFarmer(productId);
      console.log(result);
    } catch (error) {
      console.error("Error calling viewStatusForFarmer:", error);
    }
  };

  const fetchOrders = async (userId) => { // Receive userId as parameter
    try {
      const response = await http.get("/orders");
      // Filter orders where ownerId matches userId
      const userOrders = response.data.filter(order => order.ownerId === userId);
      setOrders(userOrders);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  return (
    <>
      <div className="px-4 md:px-10 px-4 md:px-10 flex flex-wrap mt-4">
        <div className="w-full mb-12 mt-20 px-4">
          <h1 className="mt-20 mb-10 font-semibold text-lg text-blueGray-700">
            VIEW STATUS
          </h1>
          <>
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white text-blueGray-700">
              <div className="rounded-t mb-0 px-4 py-3 border-0">
                <div className="flex flex-wrap items-center">
                  <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                    <h3 className="font-semibold text-lg text-blueGray-700">
                      Orders Table
                    </h3>
                  </div>
                </div>
              </div>
              <div className="block w-full overflow-x-auto">
                <table className="items-center w-full bg-transparent border-collapse">
                  <thead>
                    <tr>
                      <th className="px-4 bg-gray-100 text-xs align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                        Order ID
                      </th>
                      <th className="px-4 bg-gray-100 text-xs align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                        Product Name
                      </th>
                      <th className="px-4 bg-gray-100 text-xs align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                        Buyer ID
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order._id}>
                        <td className="border px-4 py-2 whitespace-nowrap">
                          {order._id}
                        </td>
                        <td className="border px-4 py-2 whitespace-nowrap">
                          {order.productName}
                        </td>
                        <td className="border px-4 py-2 whitespace-nowrap">
                          {order.buyerIds.length > 0 ? order.buyerIds[0] : 'N/A'}
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
