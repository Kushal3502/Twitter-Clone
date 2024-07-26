import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import authService from "../appwrite/auth";
import { logout } from "../store/slices/authSlice";

function Sidebar() {
  const navItems = [
    {
      name: "Home",
      slug: "/",
    },
    {
      name: "Bookmarks",
      slug: "/bookmarks",
    },
    {
      name: "Profile",
      slug: "/profile/:slug",
    },
  ];

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleLogout() {
    authService.logout().then(() => {
      dispatch(logout());
      navigate("/login");
    });
  }

  return (
    <div className="w-64 p-5 bg-gray-900 border-r-2 border-gray-600 h-full fixed flex flex-col justify-between">
      <div className=" flex flex-col gap-10">
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
  );
}

export default Sidebar;
