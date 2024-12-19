import React, { useEffect, useState } from "react";
import axios from "../../axios";
import SidebarAdmin from "../components/sidebarAdmin/SidebarAdmin";
import HeaderAdmin from "../components/headerAdmin/HeaderAdmin";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [updateStatus, setUpdateStatus] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const [searchQuery,setSearchQuery] = useState("");
  const navigate = useNavigate();

  // differnctiating active and block users
  const active = users.reduce((acc, value) => {
    if (value.isActive) return acc + 1;
    return acc;
  }, 0);
  const blocked = users.reduce((acc, value) => {
    if (!value.isActive) return acc + 1;
    return acc;
  }, 0);

  // fetching users
  async function fetchUsers() {
    const token = sessionStorage.getItem("adminToken");
    try {
      const usersData = await axios.get("/api/admin/getUsers", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (usersData && usersData.data) {
        setUsers(usersData.data);
        setError(false);
        setMessage("");
      }
    } catch (error) {
      setError(true);
      setMessage("Unexpected Error");
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  async function handleBlock(userId) {
    try {
      const token = sessionStorage.getItem("adminToken");
      const response = await axios.put(`/api/admin/bolckUser/${userId}`,{}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response) {
        fetchUsers();
        setUpdateStatus("")
        setError(false);
        setMessage("");
      }
    } catch (error) {
      console.log(error);
      setError(true);
      setMessage("Unexpected Error");
    }
  }

  // fuction for edit users
  function handleEdit(user) {
    navigate(`/admin/editUser/${user._id}`);
  }

  // filter users
  const filteredUsers = users.filter((user) => {
    const regex = new RegExp(searchQuery,"i");
    return regex.test(user.name) || regex.test(user.email);
  })

  return (
    <div className="bg-gradient-to-br #f8f8f8 min-h-screen">
      <div className="flex h-screen">
        <SidebarAdmin />
        {/* <!-- Main content --> */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto relative">
          {/* <!-- Header --> */}
          <HeaderAdmin page={"Admin Dashboard"}/>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-8 pt-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Total Users
                  </p>
                  <p className="text-3xl font-bold text-gray-900">
                    {users && users.length}
                  </p>
                </div>
                <div className="bg-blue-500 rounded-full p-3">
                  <i className="fas fa-users text-white text-2xl"></i>
                </div>
              </div>
              <div className="mt-4">
                <div className="bg-blue-100 rounded-full h-2 w-full">
                  <div className="bg-blue-500 rounded-full h-2 w-full"></div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Active Users
                  </p>
                  <p className="text-3xl font-bold text-gray-900">
                    {users && active}
                  </p>
                </div>
                <div className="bg-green-500 rounded-full p-3">
                  <i className="fas fa-user-check text-white text-2xl"></i>
                </div>
              </div>
              <div className="mt-4">
                <div className="bg-green-100 rounded-full h-2 w-full">
                  <div
                    className="bg-green-500 rounded-full h-2"
                    style={
                      users && {
                        width: `${(active * 100) / users.length}%`,
                      }
                    }
                  ></div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Blocked Users
                  </p>
                  <p className="text-3xl font-bold text-gray-900">{blocked}</p>
                </div>
                <div className="bg-red-500 rounded-full p-3">
                  <i className="fas fa-user-slash text-white text-2xl"></i>
                </div>
              </div>
              <div className="mt-4">
                <div className="bg-red-100 rounded-full h-2 w-full">
                  <div
                    className="bg-red-500 rounded-full h-2 "
                    style={
                      users && {
                        width: `${(blocked * 100) / users.length}%`,
                      }
                    }
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* <!-- User management table --> */}
          <div className="mx-auto py-6 px-8">
            <div className="px-4 py-6 sm:px-0">
              <div className="mb-4 relative">
                <input
                  type="text"
                  placeholder="Search users..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <i className="fas fa-search text-gray-400 mr-2 absolute right-3 top-3"></i>
              </div>
              <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200 ">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        User
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    { filteredUsers.length == 0 ? 
                      <tr>
                        <td colSpan="4" className="px-6 py-4 whitespace-nowrap text-center">
                          No users
                          </td>
                      </tr>
                    : filteredUsers.map((user) => {
                      return (
                        <tr key={user.email}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10">
                                <img
                                  className="h-10 w-10 rounded-full"
                                  src={
                                    user.imageUrl
                                      ? user.imageUrl
                                      : "https://www.transparentpng.com/thumb/user/gray-user-profile-icon-png-fP8Q1P.png"
                                  }
                                  alt="John Doe"
                                />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">
                                  {user.name}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {user.email}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`px-4 py-2 inline-flex text-xs leading-5 font-semibold rounded-3xl ${
                                user.isActive ? "bg-green-100" : "bg-red-100"
                              }`}
                            >
                              {user.isActive ? "Active" : "Blocked"}
                            </span>
                          </td>
                          <td className="flex gap-4 px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button
                              onClick={() => handleEdit(user)}
                              className="text-indigo-60 text-[16px] hover:text-indigo-900 mr-2"
                            >
                              <i className="fas fa-edit"></i>
                            </button>
                            <button
                              onClick={() => setUpdateStatus(user)}
                              className={`text-[16px] ${
                                user.isActive
                                  ? "text-red-600 hover:text-red-900"
                                  : "text-green-600 hover:text-green-900"
                              }`}
                            >
                              <i
                                className={`fas ${
                                  user.isActive
                                    ? "fa-user-slash"
                                    : "fa-user-check"
                                }`}
                              ></i>
                            </button>
                          </td>
                        </tr>
                      );
                    })

                  }
                  </tbody>
                </table>
                {updateStatus && (
                  <div className="absolute left-1/2 top-1/2 min-w-[700px] min-h-[200px] pt-5 flex flex-col justify-between text-[20px] font-semibold border border-[#d3d3d3] bg-[#f0f0f0] -translate-x-[50%]">
                    <span className="px-4 ">
                      Are you sure to{" "}
                      {updateStatus.isActive ? "block" : "unblock"} the user ?
                    </span>
                    <div className="flex w-full bg-[#e9e9e9] justify-end py-3 border border-t- gap-5">
                      <button
                        className="text-[20px] font-medium border border-[#d3d3d3] px-5 py-1"
                        onClick={() => setUpdateStatus(false)}
                      >
                        Cancel
                      </button>
                      <button
                        className="text-[20px] font-medium bg-red-600 px-5 py-1"
                        onClick={() => handleBlock(updateStatus._id)}
                      >
                        Ok
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default AdminDashboard;
