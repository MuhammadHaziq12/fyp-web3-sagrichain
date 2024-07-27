import React from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./tailwind.css";

// components
import AdminNavbar from "@/src/components/stakeholderdashboards/distributor/Navbars/AdminNavbar.jsx";
import Sidebar from "@/src/components/stakeholderdashboards/distributor/Sidebar/Sidebar.jsx";
import FooterAdmin from "@/src/components/dashboard/Footers/FooterAdmin.jsx";

export const metadata = {
  title: "Distributor Dashboard",
};

export default function Admin({ children }) {
  return (
    <>
      <Sidebar />
      <div className="relative mt-20 md:ml-64 bg-blueGray-100">
        <AdminNavbar />
        <div className="mx-auto w-full -m-24">
          {children}
          <FooterAdmin />
        </div>
      </div>
    </>
  );
}
