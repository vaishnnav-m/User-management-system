import React from "react";
import { Link, useNavigate } from "react-router-dom";

function SidebarAdmin() {
  const navigate = useNavigate();
  return (
    <aside className="w-64 h-full p-4 pb-5 flex flex-col justify-between bg-[#1d1d41] text-white">
      <div>
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>

        <Link to="/admin" className="block py-2 px-4 hover:bg-indigo-700 font-medium">
          <i className="fas fa-chart-line mr-3"></i> Dashboard
        </Link>
        <Link
          to="/admin/adduser"
          className="block py-2 px-4 hover:bg-indigo-700 transition duration-200"
        >
          <i className="fas fa-user-plus mr-3"></i> Add User
        </Link>
      </div>
      <div>
      </div>
    </aside>
  );
}

export default SidebarAdmin;
