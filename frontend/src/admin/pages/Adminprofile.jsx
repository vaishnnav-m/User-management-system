import React, { useEffect, useState } from "react";
import { Camera, User, Mail, Lock } from "lucide-react";
import axios from "../../axios";
import SidebarAdmin from "../components/sidebarAdmin/SidebarAdmin";
import HeaderAdmin from "../components/headerAdmin/HeaderAdmin";

function Adminprofile() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);


  useEffect(() => {
    async function fetchData() {
      try {
        const token = sessionStorage.getItem("adminToken");
        const user = await axios.get("/api/admin/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (user && user.data) {
          setName(user.data.name);
          setEmail(user.data.email);
          setProfileImage(user.data.imageUrl);
        }
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
      setImage(file);
    }
  };

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
    if (password && !(password.length > 7)) {
      setMessage("Password should contain minimum of 8 characters");
      setError(true);
      return false;
    }
    if (password && !(password === confirmPassword)) {
      setMessage("Passwords do not match !");
      setError(true);
      return false;
    }
    setError(false);
    setMessage("");
    return true;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validateForm()) return;

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    password && formData.append("password", password);
    image && formData.append("file", image);

    try {
      const token = sessionStorage.getItem("adminToken");
      const response = await axios.post("/api/admin/editProfile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response) {
        setName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setImage(null);
        setError(false);
        setMessage(response.data.message);
      }
    } catch (error) {
      setConfirmPassword("");
      setError(true);
      setMessage(
        error.response ? error.response.data.message : "Unexpected error"
      );
    }
  }

  return (
    <div className="bg-gradient-to-br #f8f8f8 min-h-screen">
      <div className="flex h-screen">
        <SidebarAdmin />

        {/* <!-- Main content --> */}
        <main className="flex-1 flex flex-col gap-10 overflow-x-hidden overflow-y-auto">
          {/* <!-- Header --> */}
          <HeaderAdmin page={"Admin Dashboard"} />

          <div className="w-full max-w-2xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
            <div className="relative h-40 bg-gradient-to-r from-blue-500 to-teal-500">
              <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
                <div className="w-32 h-32 rounded-full border-4 border-white overflow-hidden">
                  <img
                    src={
                      profileImage
                        ? profileImage
                        : "https://www.transparentpng.com/thumb/user/gray-user-profile-icon-png-fP8Q1P.png"
                    }
                    alt="Profile picture"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-lg">
                  <label htmlFor="picture" className="cursor-pointer">
                    <Camera className="w-6 h-6 text-gray-600" />
                  </label>
                  <input
                    id="picture"
                    type="file"
                    accept="image/*"
                    className="sr-only"
                    onChange={handleImageChange}
                  />
                </div>
              </div>
            </div>
            <div className="pt-20 px-6 py-8">
              <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
                Edit Your Profile
              </h1>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label
                    htmlFor="name"
                    className="text-lg font-medium text-gray-700"
                  >
                    Name
                  </label>
                  <div className="relative">
                    <User className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      id="name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Name"
                      required
                      className="w-full pl-10 pr-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="text-lg font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email"
                      required
                      className="w-full pl-10 pr-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="password"
                    className="text-lg font-medium text-gray-700"
                  >
                    New Password
                  </label>
                  <div className="relative">
                    <Lock className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      id="password"
                      type="password"
                      placeholder="New Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-10 pr-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="confirmPassword"
                    className="text-lg font-medium text-gray-700"
                  >
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <Lock className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      id="confirmPassword"
                      type="password"
                      placeholder="Confirm New Password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full pl-10 pr-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full py-2 px-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold rounded-md shadow-md transition-all duration-300 transform hover:scale-105"
                >
                  Save Changes
                </button>
              </form>
              {message && (
                <span className={error ? "text-red-600" : "text-green-600"}>
                  {message}
                </span>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Adminprofile;
