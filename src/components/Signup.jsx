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
    try {
      const user = await authService.createAccount(data);
      if (user) {
        navigate("/login");
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-800 p-4">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
        <div className="text-center mb-6">
          <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900">
            Create new account
          </h2>
          <p className="text-sm text-gray-600 mt-2">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500 hover:underline">
              Login
            </Link>
          </p>
        </div>
        <form onSubmit={handleSubmit(handleSignup)}>
          <Input
            label="Name"
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
            label="Email"
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
            label="Password"
            type="password"
            placeholder="Enter your password..."
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters long",
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
  );
}

export default Signup;
