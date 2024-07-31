import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "./";
import { useForm } from "react-hook-form";
import authService from "../appwrite/auth";
import { login } from "../store/slices/authSlice";
import { Hourglass } from "react-loader-spinner";
import { clearPosts } from "../store/slices/postSlice";

function Login() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    dispatch(clearPosts());
  }, [dispatch]);

  const handleLogin = async (data) => {
    setError("");
    setLoading(true);
    try {
      const session = await authService.login(data);
      if (session) {
        const user = await authService.getCurrentUser();
        if (user) {
          dispatch(login(user));
          navigate("/");
        }
      } else {
        setError("Invalid credentials");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-800 p-4">
      {loading ? (
        <Hourglass
          visible={true}
          height="80"
          width="80"
          ariaLabel="hourglass-loading"
          colors={["#306cce", "#72a1ed"]}
        />
      ) : (
        <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
          <div className="text-center mb-6">
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900">
              Login to your account
            </h2>
            <p className="text-sm text-gray-600 mt-2">
              Don't have an account?{" "}
              <Link to="/signup" className="text-blue-500 hover:underline">
                Signup
              </Link>
            </p>
          </div>
          {error && (
            <p className="text-red-500 font-semibold text-center mb-4">
              {error}
            </p>
          )}
          <form onSubmit={handleSubmit(handleLogin)}>
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
              Login
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Login;
