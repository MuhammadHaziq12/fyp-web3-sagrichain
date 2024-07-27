"use client"
import React from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./tailwind.css";

// components

import AdminNavbar from "@/src/components/stakeholderdashboards/processor/Navbars/AdminNavbar.jsx";
import Sidebar from "@/src/components/stakeholderdashboards/processor/Sidebar/Sidebar.jsx";
import HeaderStats from "@/src/components/dashboard/Headers/HeaderStats.jsx";
import FooterAdmin from "@/src/components/dashboard/Footers/FooterAdmin.jsx";

export default function Admin({ children }) {
  return (
    <>
      <Sidebar />
      <div className="relative md:ml-64 bg-blueGray-100">
        <AdminNavbar />
        {/* Header */}
        <HeaderStats />
        <div className="px-4 md:px-10 mx-auto w-full -m-24">
          {children}
          <FooterAdmin />
        </div>
      </div>
    </>
  );
}
