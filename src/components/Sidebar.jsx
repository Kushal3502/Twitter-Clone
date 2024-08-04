import React, { useState } from "react";
import { useDispatch } from "react-redux";
import toast from 'react-hot-toast'
import { Link, useNavigate } from "react-router-dom";
import authService from "../appwrite/auth";
import { logout } from "../store/slices/authSlice";

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Home", slug: "/" },
    { name: "Bookmarks", slug: "/bookmarks" },
    { name: "Profile", slug: "/profile" },
  ];

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleLogout() {
    authService.logout().then(() => {
      dispatch(logout());
      toast.success('You are successfully logout')
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
        <div className="h-full lg:hidden fixed inset-0 z-40 flex flex-col justify-between bg-gray-900">
          <div className="p-5 border-t-2 border-gray-600 flex-grow flex flex-col justify-between">
            <div className="flex flex-col">
              <div className="mb-6 mt-12">
                {navItems.map((item) => (
                  <div key={item.slug} className="my-2">
                    <Link
                      to={item.slug}
                      className="text-lg text-gray-200 hover:text-blue-500"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </Link>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-2 mt-auto pb-5">
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
        </div>
      )}
    </div>
  );
}

export default Sidebar;
