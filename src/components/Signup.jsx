import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "./";
import { useForm } from "react-hook-form";
import authService from "../appwrite/auth";
import { login } from "../store/slices/authSlice";

function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleSignup = async (data) => {
    console.log(data);
    try {
      const user = await authService.createAccount(data);
      if (user) {
        console.log(user);
        navigate("/login");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="min-h-screen h-3/4 flex flex-col items-center justify-center bg-gray-800">
      <div className="bg-white p-4 w-6/12 h-full flex align-middle justify-between rounded-xl">
        <div className="w-6/12 flex justify-center items-center">
          <h2>Welcome...</h2>
        </div>
        <div className="w-6/12 py-4">
          <div className="w-full max-w-md ">
            <h2 className="text-center text-3xl font-extrabold text-gray-900 ">
              Create new account
            </h2>
            <p className="text-center text-sm text-gray-600 mt-2">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-500">
                Login
              </Link>
            </p>
          </div>
          <div className="mt-4 w-full max-w-md">
            <form
              className=" w-full rounded p-6 "
              onSubmit={handleSubmit(handleSignup)}
            >
              <Input
                label="Name : "
                type="text"
                placeholder="Enter your name..."
                {...register("name", {
                  required: "Name is required",
                })}
              />
              {errors.name && (
                <div className="text-red-500 font-medium mb-2">
                  {errors.name.message}
                </div>
              )}
              <Input
                label="Email : "
                type="email"
                placeholder="Enter your email..."
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                    message: "Email address must be a valid address",
                  },
                })}
              />
              {errors.email && (
                <div className="text-red-500 font-medium mb-2">
                  {errors.email.message}
                </div>
              )}
              <Input
                label="Password : "
                type="password"
                placeholder="Enter your password..."
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be 8 characters long",
                  },
                })}
              />
              {errors.password && (
                <div className="text-red-500 font-medium mb-2">
                  {errors.password.message}
                </div>
              )}
              <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-6 rounded focus:outline-none focus:shadow-outline"
              >
                Create Account
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
