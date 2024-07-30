import React from "react";
import { useSelector } from "react-redux";

function Profile() {
  const userData = useSelector((state) => state.auth.userData);
console.log(userData);
  return <div>{userData.name}</div>;
}

export default Profile;
