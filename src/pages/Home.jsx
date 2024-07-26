import React from "react";
import { NavLink, Outlet } from "react-router-dom";

function Home() {
  return (
    <div className="h-screen ">
      <div className="w-full p-6 bg-gray-900 text-white flex justify-center border-b-2 border-gray-600">
        <div className=" w-2/4 flex">
          <NavLink to={"/"} className={`w-6/12 text-center`}>
            <h2>ForYou</h2>
          </NavLink>
          <NavLink to={"/following"} className={`w-6/12 text-center`}>
            <h2>Following</h2>
          </NavLink>
        </div>
      </div>
      <Outlet />
    </div>
  );
}

export default Home;
