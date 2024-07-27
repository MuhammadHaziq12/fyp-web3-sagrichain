"use client"
import React, { useState, useEffect } from "react";
import QRCode from "qrcode.react";
import Modal from "@/src/components/market/components/product-detail/Modal.jsx";
import http from "../../../(dashboards)/http.js";

const ProductDetail = ({ params }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = params;
  const [product, setProduct] = useState(null);
  const [orders, setOrders] = useState([]);
  const [farmer, setFarmer] = useState(null);
  const [qrCodeData, setQRCodeData] = useState("");

  useEffect(() => {
    fetchProduct(id);
    fetchOrders(id);
  }, [id]);

  const fetchProduct = async (productId) => {
    setIsLoading(true);
    try {
      const response = await http.get(`/products/${productId}`);
      setProduct(response.data);
      // Fetch farmer information
      fetchFarmer(response.data.userID);
    } catch (error) {
      console.error("Error fetching product:", error);
    }
    setIsLoading(false);
  };

  const fetchFarmer = async (userId) => {
    try {
      const response = await http.get(`/users/${userId}`);
      setFarmer(response.data);
    } catch (error) {
      console.error("Error fetching farmer:", error);
    }
  };

  const fetchOrders = async (productId) => {
    try {
      if (!productId) {
        console.error(
          "Error fetching orders: Product ID is missing or invalid."
        );
        return;
      }
      const response = await http.get("/orders");
      const productOrders = response.data.filter(
        (order) => order.productId === productId
      );
      // Fetch owner details for each order
      const ordersWithOwnerDetails = await Promise.all(
        productOrders.map(async (order) => {
          const ownerDetails = await fetchUserById(order.ownerId);
          return { ...order, ownerDetails };
        })
      );
      setOrders(ordersWithOwnerDetails);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const fetchUserById = async (userId) => {
    try {
      const response = await http.get(`/users/${userId}`);
      return {
        id: userId,
        name: response.data.name,
        role: response.data.role,
        city: response.data.city, // Adding city field
      };
    } catch (error) {
      console.error("Error fetching user:", error);
      return null;
    }
  };

  const handleVerify = () => {
    // Generate the QR code data using the product and farmer information
    const data = {
      productId: product?._id,
      productName: product?.productName,
      price: product?.price,
      category: product?.category,
      farmerName: farmer?.name,
      farmerCity: farmer?.city,
      createdAt: product?.createdAt,
      buyerData: orders.map((order) => ({
        buyerId: order.buyerIds[0],
        buyerName: order.ownerDetails?.name,
        buyerRole: order.ownerDetails?.role,
        buyerCity: order.ownerDetails?.city,
        boughtAt: order.createdAt,
      })),
    };
    setQRCodeData(JSON.stringify(data));

    // Open the modal
    setIsModalOpen(true);
  };

  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="border ml-20 my-20 border-green-500 p-4 rounded-md shadow-md">
          <h1 className="text-lg text-gray-700 ml-20 mt-10 mb-4">Product ID: {id}</h1>
          {isLoading && <p>Loading...</p>}
          {product && (
            <>
            <img
                            // src={product.image} // Use the image path from the product data
                            src={`http://localhost:4000/${product.image}`}
                            alt="Product Image"
                            className="w-50 h-50"
                          />
              <h1 className="text-lg text-gray-700 ml-20 mb-4">
                Product Name: {product.productName}
              </h1>
              <p className="text-lg text-gray-700 ml-20 mb-4">
                Product Price: ${product.price}
              </p>
              <p className="text-lg text-gray-700 ml-20 mb-8">
                Product Category: {product.category}
              </p>
              <div className="mb-4">
                {qrCodeData && <QRCode value={qrCodeData} size={200} />}
              </div>
              <button
                onClick={handleVerify}
                className="bg-blue-500 text-white font-bold py-2 px-4 rounded mb-4 mx-auto block"
              >
                Verify Product
              </button>
              <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <h2 className="text-lg font-semibold mb-4">Track History</h2>
                <ul className="divide-y divide-gray-300">
                  {/* Farmer Section */}
                  <li className="py-4">
                    <p className="text-gray-700 font-bold font-stretch px-4">FARMER</p>
                    <div className="ml-4">
                      <p className="text-gray-700 px-4">
                        {farmer?.name} [{farmer?._id}]
                      </p>
                      <p className="text-gray-700 px-4">City: {farmer?.city}</p>
                      <p className="text-gray-700 px-4">
                        Product Created at: {product?.createdAt}
                      </p>
                    </div>
                  </li>

                  {/* Buyers Section */}
                  {orders.map(
                    (order, index) =>
                      order.productId === id && (
                        <li key={index} className="py-4">
                          {/* <p className="text-gray-700">Buyers:</p> */}
                          {order.buyerIds.map((buyerId, idx) => (
                            <div key={idx} className="ml-4">
                              <Buyer userId={buyerId} />
                              {idx === 0 && order.createdAt && (
                                <p className="text-gray-700 px-4">
                                  Bought At: {order.createdAt}
                                </p>
                              )}
                            </div>
                          ))}
                        </li>
                      )
                  )}
                </ul>
              </Modal>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const Buyer = ({ userId }) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    fetchUserById(userId);
  }, [userId]);

  const fetchUserById = async (userId) => {
    try {
      const response = await http.get(`/users/${userId}`);
      setUserData({
        id: userId,
        name: response.data.name,
        role: response.data.role,
        city: response.data.city, // Adding city field
      });
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  return userData ? (
    <ul className="divide-y divide-gray-300">
      {/* Farmer Section */}
      <li className="">
      <p className="text-gray-700 font-bold font-stretch">{userData.role.toUpperCase()}</p>
        <div className="">
          <p className="text-gray-700 px-4">
            {userData.name} - ({userData.id})
          </p>
          <p className="text-gray-700 px-4">City: {userData.city}</p>
        </div>
      </li>
    </ul>
  ) : null;
};

export default ProductDetail;
