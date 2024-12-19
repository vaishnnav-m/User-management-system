import React from "react";
import SignupForm from '../components/signup/SignupForm'
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();
  return (
    <div className="form-div min-h-screen flex flex-col items-center  justify-center pt-[40px] bg-gradient-to-bl from-cyan-500 via-blue-500  to-cyan-500 gap-20 ">
      <div className="min-w-[500px] min-h-[550px] bg-[#f0f0f0]  shadow-2xl rounded-[3.5rem] flex flex-col justify-between items-center pt-[90px] pb-[30px] relative ">
        <div>
          <div className="w-[150px] h-[150px] absolute top-3  -translate-x-[0.25rem] -translate-y-1/2  bg-[#c4c3c3] blur-sm rounded-full"></div>
          <div className="w-[200px] h-[200px] absolute top-0 -translate-y-1/2 -translate-x-[2.25rem]">
            <img
              className="w-full h-full"
              src="https://cdn3d.iconscout.com/3d/premium/thumb/profile-3d-icon-download-in-png-blend-fbx-gltf-file-formats--user-avatar-account-essentials-interface-pack-icons-10067026.png?f=webp"
              alt=""
            />
          </div>
          <h1 className="font-bold text-[40px] text-[#b6b6b6]">Signup</h1>
        </div>
        <SignupForm />
        <span className="text-[#b6b6b6]">
          Have an account ?{" "}
          <span
            onClick={() => navigate("/login")}
            className="font-bold text-[#999999] cursor-pointer"
          >
            Login
          </span>
        </span>
      </div>
    </div>
  );
}

export default Signup;