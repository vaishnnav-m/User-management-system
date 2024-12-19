import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminLogout } from '../../../Redux/authSlice';
import { useDispatch } from 'react-redux';
import axios from '../../../axios';


function HeaderAdmin(props) {
  const [isOpen,setIsOpen] = useState(false);
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const [usersData,setUserData] = useState({});

  useEffect(() =>{
    async function fetchData() {
      try {
        const token = sessionStorage.getItem("adminToken");
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
  },[])

  function handleLogout(){
    sessionStorage.removeItem("adminToken")
    dispatch(adminLogout());
    return navigate("/admin/login")
  }

  return (
   <header className="bg-white shadow-sm">
   <div className="mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
     <h2 className="text-2xl font-bold text-gray-900">
       User management / {props.page}
     </h2>
     <div onClick={() => setIsOpen(!isOpen)} className="flex items-center gap-3">
       <img
         src={usersData.imageUrl ? usersData.imageUrl:"https://www.transparentpng.com/thumb/user/gray-user-profile-icon-png-fP8Q1P.png"}
         alt="Admin"
         className="h-8 w-8 rounded-full object-cover"
       />
       <span className="font-bold">
         {usersData.name} <i className={`fa-solid fa-angle-${isOpen?"up":"down"}`}></i>
       </span>
     </div>

      {isOpen && <div className='px-10 py-5 absolute right-2 top-[65px] bg-[#e9e9e9]'>
        <ul className='flex flex-col gap-5 text-[20px] font-bold'>
          <li onClick={() => navigate("/admin/profile")}>Profile</li>
          <li onClick={handleLogout}><i className="fas fa-sign-out-alt mr-3"></i> Logout</li>
        </ul>
      </div>}
   </div>
 </header>
  )
}

export default HeaderAdmin