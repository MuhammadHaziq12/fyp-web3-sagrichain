"use client"
import React, { useState, useEffect } from "react";
import http from "../../../app/(dashboards)/http.js";

export default function Tables() {
  const [orders, setOrders] = useState([]);
  // const [orders1, setOrders1] = useState([]);
  const [userData, setUserData] = useState(null);
  const [productDetails, setProductDetails] = useState({});

  useEffect(() => {
    const storedUserData = sessionStorage.getItem("userData");
    if (storedUserData) {
      const parsedUserData = JSON.parse(storedUserData);
      setUserData(parsedUserData);
    }
  }, []);

  useEffect(() => {
    if (userData) {
      fetchOrders(userData.blockchainAddress);
    }
  }, [userData]);

  const fetchOrders = async (userId) => {
    try {
      const response = await http.get("/orders");
      const userOrders = response.data.filter(order => order.buyerIds.includes(userId));
      setOrders(userOrders);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

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

  useEffect(() => {
    Promise.all(orders.map(order => fetchAllProducts(order.productMongoDBId)))
      .then(products => {
        const productDetailsMap = {};
        products.forEach(product => {
          productDetailsMap[product._id] = product;
        });
        setProductDetails(productDetailsMap);
      })
      .catch(error => {
        console.error("Error fetching product details:", error);
      });
  }, [orders]);

  return (
    <>
      <div className="px-4 md:px-10 flex flex-wrap mt-4">
        <div className="w-full mb-12 mt-20 px-4">
          <h1 className="mt-20 mb-10 font-semibold text-lg text-blueGray-700">
            Your Buyed Products List
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
                <table className="items-center w-full bg-transparent border-collapse">
                  <thead>
                    <tr>
                      <th className="px-4 bg-gray-100 text-xs align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                        Product ID
                      </th>
                      <th className="px-4 bg-gray-100 text-xs align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                        Product Name
                      </th>
                      <th className="px-4 bg-gray-100 text-xs align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                        Price
                      </th>
                      <th className="px-4 bg-gray-100 text-xs align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                        Quantity
                      </th>
                      <th className="px-4 bg-gray-100 text-xs align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                        Category
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order._id}>
                        <td className="border px-4 py-2 whitespace-nowrap">
                          {order.productMongoDBId}
                        </td>
                        <td className="border px-4 py-2 whitespace-nowrap">
                          {order.productName}
                        </td>
                        {productDetails[order.productMongoDBId] && (
                          <>
                            <td className="border px-4 py-2 whitespace-nowrap">
                              {productDetails[order.productMongoDBId].price}
                            </td>
                            <td className="border px-4 py-2 whitespace-nowrap">
                              {productDetails[order.productMongoDBId].quantity}
                            </td>
                            <td className="border px-4 py-2 whitespace-nowrap">
                              {productDetails[order.productMongoDBId].category}
                            </td>
                          </>
                        )}
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