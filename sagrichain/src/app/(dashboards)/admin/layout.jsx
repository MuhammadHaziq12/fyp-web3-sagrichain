"use client"
import React from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./tailwind.css";

// components
import AdminNavbar from "@/src/components/stakeholderdashboards/admin/Navbars/AdminNavbar.jsx";
import Sidebar from "@/src/components/stakeholderdashboards/admin/Sidebar/Sidebar.jsx";
import HeaderStats from "@/src/components/dashboard/Headers/HeaderStats.jsx";
import FooterAdmin from "@/src/components/dashboard/Footers/FooterAdmin.jsx";
//import DashboardNav from "@/src/components/dashboard/common/DashboardNavbar.jsx"

export default function Admin({ children }) {
  return (
    <>
      <Sidebar />
      <div className="mt-20 relative md:ml-64 bg-blueGray-100">
        <AdminNavbar />
        {/* Header */}
        {/* <HeaderStats /> */}
        <div className="mx-auto w-full -m-24">
          {children}
          <FooterAdmin />
        </div>
      </div>
    </>
  );
}
