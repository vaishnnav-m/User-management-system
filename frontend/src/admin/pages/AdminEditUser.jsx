import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import HeaderAdmin from "../components/headerAdmin/HeaderAdmin";
import SidebarAdmin from "../components/sidebarAdmin/SidebarAdmin";
import axios from "../../axios"

function AdminEditUser() {
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  const { userId } = useParams();

  //states for form
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [editUser, setEditUser] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    // to fetch user details
    async function fetchUsers() {
      const token = sessionStorage.getItem("adminToken");
      try {
        const userData = await axios.get(`/api/admin/getUserEdit/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (userData && userData.data) {
          setEditUser(userData.data);
        }
      } catch (error) {
        console.log("error is :",error)
        setError(true);
        setMessage("Unexpected Error");
      }
    }
    fetchUsers();
  }, []);

  // function to handleImage change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
      setImage(file);
    }
  };

  // function to handle form submission
  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    name && formData.append("name", name);
    email && formData.append("email", email);
    image && formData.append("file", image);
    try {
      const token = sessionStorage.getItem("adminToken");
      const response = await axios.post(
        `/api/admin/editUser/${editUser._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response) {
        setEditUser({ name: "", email: "", imageUrl: "" });
        setImage(null);
        setError(false);
        setMessage(response.data.message);
        navigate("/admin");
      }
    } catch (error) {
      console.log("error is :",error)
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
        <main className="flex-1 overflow-x-hidden overflow-y-auto">
          {/* <!-- Header --> */}
          <HeaderAdmin page={"Admin Dashboard"} />

          <div className="container mx-auto p-4">
            <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <h2 className="text-xl font-semibold mb-4">
                    Edit User Profile
                  </h2>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="space-y-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200">
                        {editUser && (
                          <img
                            src={
                              profileImage ||
                              image ||
                              editUser.imageUrl ||
                              "https://www.transparentpng.com/thumb/user/gray-user-profile-icon-png-fP8Q1P.png"
                            }
                            alt="User Avatar"
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>
                      <div>
                        <label
                          htmlFor="avatar"
                          className="inline-block px-4 py-2 bg-gray-200 text-gray-700 rounded cursor-pointer hover:bg-gray-300 transition duration-200"
                        >
                          <i className="fas fa-camera mr-2"></i> Change Avatar
                        </label>
                        <input
                          id="avatar"
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleImageChange}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Name
                      </label>
                      <div className="relative">
                        <i className="fas fa-user absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                        <input
                          id="name"
                          type="text"
                          value={name || editUser.name}
                          onChange={(e) => setName(e.target.value)}
                          className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Email
                      </label>
                      <div className="relative">
                        <i className="fas fa-envelope absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                        <input
                          id="email"
                          type="email"
                          value={email || editUser.email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 text-right">
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200"
                    >
                      <i className="fas fa-save mr-2"></i> Save Changes
                    </button>
                    {message && (
                      <span
                        className={error ? "text-red-600" : "text-green-600"}
                      >
                        {message}
                      </span>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default AdminEditUser;
