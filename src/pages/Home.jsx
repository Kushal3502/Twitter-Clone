import React from "react";
import { Outlet } from "react-router-dom";

function Home() {
  return (
    <div className="h-screen p-2">
      Home
      <Outlet />
    </div>
  );
}

export default Home;
