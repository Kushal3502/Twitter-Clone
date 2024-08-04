import React from "react";
import { Tweet } from "../components";

function AddPost() {
  return (
    <div className="h-screen w-full flex justify-center items-center bg-gray-900 p-4">
      <div className="w-full max-w-lg">
        <Tweet />
      </div>
    </div>
  );
}

export default AddPost;
