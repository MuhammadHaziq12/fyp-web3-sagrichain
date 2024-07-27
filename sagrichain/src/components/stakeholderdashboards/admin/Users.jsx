"use client"
import React, { useState, useEffect } from "react";
import http from "../../../app/(dashboards)/http.js";
import Link from "next/link.js";

export default function Tables() {
  const [users, setUsers] = useState([]);
  const [userData, setUserData] = useState(null);
  const [dashboard, setDashboard] = useState("");

  // useEffect(() => {
  //   fetchAllUsers();
  // }, []);

  useEffect(() => {
    // Retrieve user data from session storage or state management
    const storedUserData = sessionStorage.getItem("userData");
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
      setDashboard(JSON.parse(storedUserData).dashboard);
      fetchAllUsers(JSON.parse(storedUserData)._id);
    }
  }, []);

  const fetchAllUsers = () => {
    http.get("/users/all").then((res) => {
      setUsers(res.data);
    });
  };

  const deleteUser = (id) => {
    http.delete(`/users/${id}`).then(() => {
      fetchAllUsers();
    });
  };

  return (
    <>
      <div className="px-4 md:px-10 flex flex-wrap mt-4">
        <div className="w-full mb-12 mt-20 px-4">
          <h1 className="mt-20 mb-10 font-semibold text-lg text-blueGray-700">
            Users List
          </h1>
          <>
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white text-blueGray-700">
              <div className="rounded-t mb-0 px-4 py-3 border-0">
                <div className="flex flex-wrap items-center">
                  <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                    <h3 className="font-semibold text-lg text-blueGray-700">
                      Users Table
                    </h3>
                  </div>
                </div>
              </div>
              <div className="block w-full overflow-x-auto">
                <table className="items-center w-full bg-transparent border-collapse">
                  <thead>
                    <tr>
                      <th className="px-4 bg-gray-100 text-xs align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                        User ID
                      </th>
                      <th className="px-4 bg-gray-100 text-xs align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                        Name
                      </th>
                      <th className="px-4 bg-gray-100 text-xs align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                        Email
                      </th>
                      <th className="px-4 bg-gray-100 text-xs align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                        Role
                      </th>
                      <th className="px-4 bg-gray-100 text-xs align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user, index) => (
                      <tr key={user._id}>
                        <td className="border px-2 py-2 whitespace-nowrap">
                          {index + 1}
                        </td>
                        <td className="border px-2 py-2 whitespace-nowrap">
                          {user.name}
                        </td>
                        <td className="border px-2 py-2 whitespace-nowrap">
                          {user.email}
                        </td>
                        <td className="border px-2 py-2 whitespace-nowrap">
                          {user.role}
                        </td>
                        <td className="border px-2 py-2 whitespace-nowrap">
                          <Link
                            href={`/${userData.role}/edituser/${user._id}`}
                          >
                          <button className="text-blue-700 font-bold py-1 px-2 mr-2 rounded">
                            <span>
                              <i className="fa-solid fa-pen-to-square px-1"></i>
                            </span>
                          </button>
                          </Link>
                          <button
                            onClick={() => deleteUser(user._id)}
                            className="text-red-700 font-bold py-1 px-2 rounded"
                          >
                            <i className="fas fa-trash-alt px-1"></i>
                          </button>
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
