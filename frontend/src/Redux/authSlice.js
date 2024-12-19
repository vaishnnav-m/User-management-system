import { createSlice } from "@reduxjs/toolkit";

const token = sessionStorage.getItem("token");
const adminToken = sessionStorage.getItem("adminToken");

const initialState = {
  token: token ? token : null,
  isAuthenticated: !!token,
  adminToken: adminToken ? adminToken : null,
  isAdminAuthenticated: !!adminToken,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.token = action.payload;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.token = null;
      state.isAuthenticated = false;
    },
    adminLoginSuccess: (state, action) => {
      state.adminToken = action.payload;
      state.isAdminAuthenticated = true;
    },
    adminLogout: (state) => {
      state.adminToken = null;
      state.isAdminAuthenticated = false;
    },
  },
});

export const { loginSuccess, logout, adminLoginSuccess, adminLogout } = authSlice.actions;

export default authSlice.reducer;
