import React from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./tailwind.css";

export const metadata = {
  title: "Wholesaler Dashboard",
};

import AdminNavbar from "@/src/components/stakeholderdashboards/wholesaler/Navbars/AdminNavbar.jsx";
import Sidebar from "@/src/components/stakeholderdashboards/wholesaler/Sidebar/Sidebar.jsx";
import FooterAdmin from "@/src/components/dashboard/Footers/FooterAdmin.jsx";

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
