import React from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./tailwind.css";

export const metadata = {
  title: "Farmer Dashboard",
};

// components
import AdminNavbar from "@/src/components/stakeholderdashboards/farmer/Navbars/AdminNavbar.jsx";
import Sidebar from "@/src/components/stakeholderdashboards/farmer/Sidebar/Sidebar.jsx";
import FooterAdmin from "@/src/components/dashboard/Footers/FooterAdmin.jsx";

export default function Admin({ children }) {
  return (
    <>
      <Sidebar />
      <div className="mt-20 relative md:ml-64 bg-blueGray-100">
        <AdminNavbar />
        <div className="mx-auto w-full -m-24">
          {children}
          <FooterAdmin />
        </div>
      </div>
    </>
  );
}
