"use client"
import React, { useState, useEffect } from "react";
import http from "../../../../app/(dashboards)/http.js";

export default function Tables() {
  const [orders1, setOrders1] = useState([]);
  const [orders2, setOrders2] = useState([]);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const storedUserData = sessionStorage.getItem("userData");
    if (storedUserData) {
      const parsedUserData = JSON.parse(storedUserData);
      setUserData(parsedUserData);
      fetchOrders1(parsedUserData._id); // Pass userData._id to fetchOrders
      fetchOrders2(parsedUserData._id); // Pass userData._id to fetchOrders
    }
  }, []);


  const fetchAllProducts = async (productId) => {
    try {
      const response = await http.get("/products");
      const product = response.data.find(product => product._id === productId);
      return product;
    } catch (error) {
      console.error("Error fetching product details:", error);
      return null;
    }
  };

  const fetchOrders1 = async (userId) => {
    try {
      const response = await http.get("/orders");
      const ordersData = response.data;

      // Fetch products to get distributorStatus
      const productsResponse = await http.get("/products");
      const products = productsResponse.data;

      // Filter orders where distributorStatus is "unsold"
      const userOrders1 = ordersData.filter(order1 => {
        const product = products.find(product => product._id === order1.productId);
        return order1.buyerIds[0] === userId && product && product.distributorStatus === "sold";
      });

      setOrders1(userOrders1);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };


  const fetchOrders2 = async (userId) => {
    try {
      const response = await http.get("/orders");
      const userOrders2 = response.data.filter(order2 => order2.buyerIds[1]);
      setOrders2(userOrders2);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  return (
    <>
      <div className="px-4 md:px-10 flex flex-wrap mt-4">
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
                    {orders1.map((order1) => (
                      <tr key={order1._id}>
                        <td className="border px-4 py-2 whitespace-nowrap">
                          {order1._id}
                        </td>
                        <td className="border px-4 py-2 whitespace-nowrap">
                          {order1.productName}
                        </td>
                        <td className="border px-4 py-2 whitespace-nowrap">
                          {orders2.find(order2 => order2.productId === order1.productId)?.buyerIds[1]}
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