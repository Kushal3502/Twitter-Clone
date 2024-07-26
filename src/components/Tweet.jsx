import React from "react";
import { useForm } from "react-hook-form";

function Tweet() {
  const { register, handleSubmit } = useForm();

  return (
    <form className="p-4 border border-gray-600 rounded-md shadow-sm h-1/2 w-1/2">
      <textarea
        className="h-4/5 w-full mb-8 p-2 text-white bg-gray-900 rounded-md resize-none focus:outline-none "
        placeholder="What's happening?"
      />
      <div className="flex justify-end gap-2">
        <div>
          <input type="file" id="fileInput" className="hidden" />
          <label
            htmlFor="fileInput"
            className="inline-block bg-green-500 text-white py-2 px-4 rounded cursor-pointer hover:bg-green-600"
          >
            Choose a file
          </label>
        </div>
        <button className="bg-blue-500 text-white py-2 px-12 rounded hover:bg-blue-600">
          Post
        </button>
      </div>
    </form>
  );
}

export default Tweet;
