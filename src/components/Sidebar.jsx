import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

import { CgProfile } from "react-icons/cg";
import { FaBookmark } from "react-icons/fa";
import { IoMdHome } from "react-icons/io";

import { Link, useNavigate } from "react-router-dom";
import authService from "../appwrite/auth";
import { logout } from "../store/slices/authSlice";

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Home", slug: "/", icon: <IoMdHome /> },
    { name: "Bookmarks", slug: "/bookmarks", icon: <FaBookmark /> },
    { name: "Profile", slug: "/profile", icon: <CgProfile /> },
  ];

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleLogout() {
    authService.logout().then(() => {
      dispatch(logout());
      toast.success("You are successfully logout");
      navigate("/login");
    });
  }

  return (
    <div>
      {/* Full sidebar for larger screens */}
      <div className="hidden lg:flex lg:w-64 lg:p-5 lg:bg-gray-900 lg:border-r-2 lg:border-gray-600 lg:h-full lg:fixed lg:flex-col lg:justify-between">
        <div className="flex flex-col gap-10">
          <div className="mb-6 text-2xl font-bold">
            <Link to={"/"}>
              <img
                src="https://www.freepnglogos.com/uploads/twitter-x-logo-png/twitter-x-logo-png-9.png"
                className="w-12 h-12"
                alt="Logo"
              />
            </Link>
          </div>
          <div className="mb-6">
            {navItems.map((item) => (
              <div key={item.slug} className="my-2">
                <Link
                  to={item.slug}
                  className="text-lg text-gray-200 hover:text-blue-500"
                >
                  {item.name}
                </Link>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="mb-4">
            <Link to={"/add-post"}>
              <button className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-700">
                Post
              </button>
            </Link>
          </div>
          <div>
            <Link to={"/login"}>
              <button
                className="w-full py-2 px-4 bg-red-500 text-white rounded hover:bg-red-700"
                onClick={handleLogout}
              >
                Logout
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Icon for smaller screens */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          className="text-white bg-gray-900 p-2 rounded"
          onClick={() => setIsOpen(!isOpen)}
        >
          <img
            src="https://www.freepnglogos.com/uploads/twitter-x-logo-png/twitter-x-logo-png-9.png"
            className="w-8 h-8"
            alt="Menu"
          />
        </button>
      </div>

      {/* Full sidebar for smaller screens when open */}
      {isOpen && (
        <div className="fixed inset-y-0 left-0 z-40 w-16 lg:hidden bg-gray-900 hover:w-64 transition-all duration-300 flex flex-col justify-between">
          <div className="p-2 flex-grow flex flex-col items-center lg:items-start">
            <div className="my-6">
              {navItems.map((item) => (
                <Link
                  key={item.slug}
                  to={item.slug}
                  className="my-2 w-full text-gray-200 flex items-center hover:text-blue-500"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="w-full flex items-center space-x-2">
                    <item.icon className="h-6 w-6" />
                    <span className="hidden lg:inline">{item.name}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-2 pb-5">
            <Link to={"/add-post"} onClick={() => setIsOpen(false)}>
              <button className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-700">
                Post
              </button>
            </Link>
            <Link to={"/login"}>
              <button
                className="w-full py-2 px-4 bg-red-500 text-white rounded hover:bg-red-700"
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
              >
                Logout
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default Sidebar;
