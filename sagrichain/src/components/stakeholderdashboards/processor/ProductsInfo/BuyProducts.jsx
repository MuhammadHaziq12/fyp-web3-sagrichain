
import React, { useState, useEffect } from "react";
import http from "../../../../app/(dashboards)/http.js";

export default function Tables() {
  const [products, setProducts] = useState([]);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const storedUserData = sessionStorage.getItem("userData");
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
      fetchProducts();
    }
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await http.get(`/products`);
      // Filter out products where distributorStatus is 'unsold' and farmerStatus is 'sold'
      const filteredProducts = response.data.filter(product => product.distributorStatus === 'unsold' && product.farmerStatus === 'sold');
      setProducts(filteredProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const createOrder = async (productId, productName, ownerId) => {
    try {
      const response = await http.post('/orders', {
        buyerId: userData._id,
        ownerId: ownerId,
        productId: productId,
        productName: productName
      });

      // Update the status of the product to "sold"
      await http.put(`/products/${productId}`, { distributorStatus: 'sold' });

      // Fetch updated products after successful order creation
      fetchProducts();

      // Handle the response here, if needed
      console.log("Order created:", response.data);
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };

  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 mt-20 px-4">
          <h1 className="mt-20 mb-10 font-semibold text-lg text-blueGray-700">
            Buy Product
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
                      <th className="px-4 bg-gray-100 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                        Product Name
                      </th>
                      <th className="px-4 bg-gray-100 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                        Price
                      </th>
                      <th className="px-4 bg-gray-100 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                        Quantity
                      </th>
                      <th className="px-4 bg-gray-100 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                        Category
                      </th>
                      <th className="px-4 bg-gray-100 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                        User
                      </th>
                      <th className="px-4 bg-gray-100 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product, index) => (
                      <tr key={index} className="border">
                        <td className="border px-4 py-2 align-middle text-xs whitespace-nowrap p-2">
                          <p>{product.productName}</p>
                        </td>
                        <td className="border px-6 py-4 align-middle text-xs whitespace-nowrap p-2">
                          ${product.price} USD
                        </td>
                        <td className="border px-6 py-4 align-middle text-xs whitespace-nowrap p-2">
                          <i className="fas fa-circle text-orange-500 mr-2"></i>{" "}
                          {product.quantity}Kg
                        </td>
                        <td className="border px-6 py-4 align-middle text-xs whitespace-nowrap p-2">
                          {product.category}
                        </td>
                        <td className="border px-6 py-4 align-middle text-xs whitespace-nowrap p-2">
                          {product.userID}
                        </td>
                        <td className="border px-6 py-4 align-middle text-xs whitespace-nowrap p-2">
                          <div className="flex items-center">
                            <div className="relative w-full">
                              <button
                                type="button"
                                onClick={() => createOrder(product._id, product.productName, product.userID)}
                                className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                              >
                                <i className="fas fa-cart-plus mr-2"></i>
                                Buy
                              </button>
                            </div>
                          </div>
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
