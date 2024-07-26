import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import { useEffect, useState } from "react";
import authService from "./appwrite/auth";
import { useDispatch } from "react-redux";
import { login, logout } from "./store/slices/authSlice";
import appwriteService from "./appwrite/config";
import { addPost, clearPosts } from "./store/slices/postSlice";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    authService.getCurrentUser().then((user) => {
      if (user) {
        dispatch(login(user));
        appwriteService.getAllPosts().then((posts) => {
          console.log(posts.documents);
          posts.documents.map((post) => dispatch(addPost(post)));
          navigate("/");
        });
      } else {
        dispatch(logout());
        dispatch(clearPosts());
        navigate("/login");
      }
    });
  }, []);

  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 ml-64 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}

export default App;
