import { useNavigate } from "react-router-dom";
import axios from "../../axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../Redux/authSlice";

function Home() {
  const [userData, setUserData] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchData() {
      try {
        const token = sessionStorage.getItem("token");
        const user = await axios.get("/api/users/home", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (user && user.data) {
          setUserData(user.data);
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  function handleLogout() {
    sessionStorage.removeItem("token");
    dispatch(logout());
    navigate("/login");
  }


  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">My App</h1>
          <button
            onClick={() => handleLogout()}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out"
            aria-label="Logout"
          >
            <i className="fa-solid fa-right-from-bracket mr-1"></i>
            Logout
          </button>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-md mx-auto">
          <div className="text-center">
            <div className="mb-6 relative inline-block">
              <img
                src={
                  userData.imageUrl
                    ? userData.imageUrl
                    : "https://www.transparentpng.com/thumb/user/gray-user-profile-icon-png-fP8Q1P.png"
                }
                alt={userData ? userData.name : ""}
                className="rounded-full w-32 h-32 object-cover border-4 border-blue-500"
              />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              {userData ? userData.name : ""}
            </h2>
            <p className="text-gray-600 mb-4">
              Welcome to your personal dashboard!
            </p>
          </div>
          <div className="mt-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Quick Action
            </h3>
            <button onClick={() => navigate("/editProfile")} className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out">
              <i className="fa-solid fa-pen inline-block mr-2 h-5 w-5"></i>
              Edit Profile
            </button>
          </div>
        </div>
      </main>

      <footer className="bg-gray-800 text-white py-4">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 My App. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default Home;
