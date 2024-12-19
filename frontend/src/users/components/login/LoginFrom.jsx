import React, { useState } from "react";
import axios from "../../../axios";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../../Redux/authSlice";
import { useNavigate } from "react-router-dom";

function LoginFrom() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleSbumit(e) {
    e.preventDefault();

    const formData = {
      email,
      password,
    };

    try {
      const response = await axios.post("/api/users/login", formData);

      if (response) {
        const token = response.data.token;
        dispatch(loginSuccess(token));
        sessionStorage.setItem("token",token);
        navigate("/");
      }
    } catch (error) {
      setError(true);
      setMessage(
        error.response ? error.response.data.message : "Unexpected Error"
      );
    }
  }
  return (
    <form
      onSubmit={handleSbumit}
      className="w-full h-full flex flex-col gap-9  rounded-3xl p-10"
      action=""
    >
      <div className="flex flex-col justify-center relative">
        <i className="fa-solid fa-envelope absolute left-[21px] text-[20px] text-[#999999]"></i>
        <input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          placeholder="Email"
          className="h-[60px] bg-[#e0dfdf] rounded-[20px] pl-[50px] focus:outline-[#28acec]"
          required
          type="email"
          name="email"
        />
      </div>

      <div className="flex flex-col justify-center relative">
        <i className="fa-solid fa-lock absolute left-[21px] text-[20px] text-[#999999]"></i>
        <input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          placeholder="Password"
          className="h-[60px] bg-[#e0dfdf] rounded-[20px] pl-[50px] focus:outline-[#28acec]"
          required
          type="password"
          name="password"
        />
      </div>

      <button
        type="submit"
        className="h-[60px] bg-[#28acec] rounded-[20px] hover:bg-[#2696e9] text-[#f0f0f0] font-bold text-[20px]"
      >
        Login
      </button>
      {message && (
          <span className={error ? "text-red-600" : "text-green-600"}>
            {message}
          </span>
        )}
    </form>
  );
}

export default LoginFrom;
