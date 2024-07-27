"use client"
import React from "react";

import ProductTable from "@/src/components/stakeholderdashboards/retailer/ProductsInfo/BuyProducts.jsx";

export default function Tables() {
  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          <ProductTable />
        </div>
      </div>
    </>
  );
}

// Tables.layout = Admin;
