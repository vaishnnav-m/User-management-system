import React from "react";
import EditProfileForm from "../components/editForm/EditProfileForm";

function EditProfile() {
  const userData = { imageUrl: null };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 p-4">
      <EditProfileForm/>
    </div>
  );
}

export default EditProfile;
