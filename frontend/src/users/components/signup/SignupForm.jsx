import React, { useState } from "react";
import axios from "../../../axios";

function SignupForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
    console.log(password.length > 7);
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
      const response = await axios.post("/api/users/signup", formData, {
        headers: {
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
      setError(true);
      setMessage(
        error.response ? error.response.data.message : "Unexpected error"
      );
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full h-full flex flex-col gap-9  rounded-3xl p-10"
      action=""
    >
      <div className="flex flex-col justify-center relative">
        <i className="fa-solid fa-user absolute left-[21px] text-[20px] text-[#999999]"></i>
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          placeholder="Name"
          className="h-[60px] bg-[#e0dfdf] rounded-[20px] pl-[50px] focus:outline-[#28acec]"
          type="text"
          name="name"
        />
      </div>

      <div className="flex flex-col justify-center relative">
        <i className="fa-solid fa-envelope absolute left-[21px] text-[20px] text-[#999999]"></i>
        <input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          placeholder="Email"
          className="h-[60px] bg-[#e0dfdf] rounded-[20px] pl-[50px] focus:outline-[#28acec]"
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
          type="password"
          name="password"
        />
      </div>
      <div className="flex flex-col justify-center relative">
        <label
          className="w-fit font-bold py-[15px] px-[30px] bg-[#e0dfdf] rounded-[20px] text-[#9ea7b5] cursor-pointer"
          htmlFor="upload"
        >
          {" "}
          <i className="fa-solid fa-upload mr-2 text-[20px] text-[#999999]"></i>{" "}
          Upload
        </label>
        <input
          onChange={(e) => setImage(e.target.files[0])}
          className="hidden"
          id="upload"
          type="file"
        />
      </div>

      <button
        type="submit"
        className="h-[60px] bg-[#28acec] rounded-[20px] hover:bg-[#2696e9] text-[#f0f0f0] font-bold text-[20px]"
      >
        Signup
      </button>
      {message && (
        <span className={error ? "text-red-600" : "text-green-600"}>
          {message}
        </span>
      )}
    </form>
  );
}

export default SignupForm;
