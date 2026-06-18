import React from 'react'
import { Link, useNavigate  } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from 'react';
import { logout } from "../feature/userSlice";

const Navbar = () => {
   const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get role and login state from Redux slice
  const { currentUser, isLoggedIn, role } = useSelector((state) => state.user);

  const handleLogout = () => {
    // Clear Redux state
    dispatch(logout());

    // Navigate to login page
    navigate("/");
  };

  useEffect(()=>{
        if(isLoggedIn == false)
        {
           
            navigate("/"); // redirect after login

        }

    },[isLoggedIn])

 return (
    <nav className="bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-600 text-white shadow-md">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <h3 className="text-2xl font-bold tracking-wide">CRM Portal</h3>

        {/* Links */}
        <div className="flex gap-6 items-center">
          {isLoggedIn && (
            <Link
              to="/home"
              className="hover:text-yellow-300 transition-colors duration-200"
            >
              Home
            </Link>
          )}
          {!isLoggedIn && (
            <Link
              to="/"
              className="hover:text-yellow-300 transition-colors duration-200"
            >
              Login
            </Link>
          )}
          {!isLoggedIn && (
            <Link
              to="/register"
              className="hover:text-yellow-300 transition-colors duration-200"
            >
              Register
            </Link>
          )}
          {role === "admin" && (
            <Link
              to="/crm"
              className="hover:text-yellow-300 transition-colors duration-200"
            >
              Customer
            </Link>
          )}
           {isLoggedIn && (

          <Link
              to="/services"
              className="hover:text-yellow-300 transition-colors duration-200"
            >
              Services
            </Link>)}
          {isLoggedIn && (
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );

}

export default Navbar