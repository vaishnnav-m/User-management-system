import React, { useState } from "react";
import SidebarAdmin from "../components/sidebarAdmin/SidebarAdmin";
import HeaderAdmin from "../components/headerAdmin/HeaderAdmin";
import axios from "../../axios";

function AdminAddUser() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  function validateForm() {
    const nameRegex = /^[a-zA-Z]{3,30}$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!nameRegex.test(name)) {
      setMessage(
        "Name should contain minimum of 3 characters and below 30 characters"
      );
      setError(true);
      return false;
    }
    if (!emailRegex.test(email)) {
      setMessage("Invalid email format");
      setError(true);
      return false;
    }
    if (!(password.length > 7)) {
      setMessage("Password should contain minimum of 8 characters");
      setError(true);
      return false;
    }
    return true;
  }
  async function handleSubmit(e) {
    e.preventDefault();
    if (!validateForm()) return;

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    if (image) formData.append("file", image);

    try {
      const adminToken = sessionStorage.getItem("adminToken");
      const response = await axios.post("/api/admin/addUser", formData, {
        headers: {
          Authorization: `Bearer ${adminToken}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (response) {
        setName("");
        setEmail("");
        setPassword("");
        setImage(null);
        setError(false);
        setMessage(response.data.message);
      }
    } catch (error) {
      console.log(error);
      setError(true);
      setMessage(
        error.response ? error.response.data.message : "Unexpected error"
      );
    }
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
      setImage(file);
    }
  };
  return (
    <div className="bg-gradient-to-br #f8f8f8  min-h-screen">
      <div className="flex h-screen">
        <SidebarAdmin />
        <div className="flex-1 ">
          <HeaderAdmin page={"Add New User"} />
          <div className="p-10">
            <div className="md:hidden">
              <button className="text-gray-500 hover:text-gray-600">
                <i className="fas fa-bars"></i>
              </button>
            </div>
            <form
              onSubmit={handleSubmit}
              className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
            >
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="name"
                >
                  Name
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="john@example.com"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="mb-6">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="profile-image"
                >
                  Profile Image
                </label>
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <input
                      className="hidden"
                      id="profile-image"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                    <label
                      htmlFor="profile-image"
                      className="cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                      Choose File
                    </label>
                  </div>
                  <div
                    id="image-preview"
                    className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden"
                  >
                    {profileImage ? (
                      <img
                        id="preview-image"
                        className="w-full h-full object-cover"
                        src={profileImage}
                        alt="Profile Image Preview"
                      />
                    ) : (
                      <span id="preview-text" className="text-gray-500">
                        No Image
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Add User
                </button>
              </div>
            </form>
            {message && (
              <span className={error ? "text-red-600" : "text-green-600"}>
                {message}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminAddUser;
