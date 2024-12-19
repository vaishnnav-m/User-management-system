import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./users/pages/Home";
import Signup from "./users/pages/Signup";
import Login from "./users/pages/Login";
import ProtectedRoute from "./users/components/protected/ProtectedRoute";
import PublicRotes from "./users/components/publicRoute/PublicRotes";
import EditProfile from "./users/pages/EditProfile";
import AdminLogin from "./admin/pages/AdminLogin";
import AdminDashboard from "./admin/pages/AdminDashboard";
import AdminProtected from "./admin/components/protected/AdminProtected";
import AdminPublicRoutes from "./admin/components/publicRoutes/AdminPublicRoutes";
import AdminAddUser from "./admin/pages/AdminAddUser";
import AdminEditUser from "./admin/pages/AdminEditUser";
import Adminprofile from "./admin/pages/Adminprofile";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <PublicRotes>
              <Signup />
            </PublicRotes>
          }
        />
        <Route
          path="/login"
          element={
            <PublicRotes>
              <Login />
            </PublicRotes>
          }
        />
        <Route
          path="/editProfile"
          element={
            <ProtectedRoute>
              <EditProfile />
            </ProtectedRoute>
          }
        />
        <Route path="/admin" element={
          <AdminProtected>
            <AdminDashboard/>
          </AdminProtected>
          } />
        <Route path = "/admin/login" element = {
          <AdminPublicRoutes>
            <AdminLogin/>
          </AdminPublicRoutes>
          } />
          <Route path="/admin/adduser" element={
          <AdminProtected>
            <AdminAddUser/>
          </AdminProtected>
          } />
          <Route path="/admin/editUser/:userId" element={
          <AdminProtected>
            <AdminEditUser/>
          </AdminProtected>
          } />
          <Route path="/admin/profile" element={
          <AdminProtected>
            <Adminprofile/>
          </AdminProtected>
          } />
      </Routes>
    </Router>
  );
}

export default App;
