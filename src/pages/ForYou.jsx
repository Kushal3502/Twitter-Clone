import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TweetCard } from "../components";
import { useNavigate } from "react-router-dom";
import authService from "../appwrite/auth";
import { login, logout } from "../store/slices/authSlice";
import { addPost, clearPosts } from "../store/slices/postSlice";
import appwriteService from "../appwrite/config";
import { Hourglass } from "react-loader-spinner";

function ForYou() {
  const posts = useSelector((state) => state.tweets.tweets);
  console.log(posts);
  const [loader, setLoader] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setLoader(true);
    authService.getCurrentUser().then((user) => {
      if (user) {
        dispatch(login(user));
        dispatch(clearPosts());
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
      setLoader(false);
    });
  }, []);

  return (
    <>
      {loader ? (
        <div className="w-full h-full flex justify-center items-center">
          <Hourglass
            visible={true}
            height="80"
            width="80"
            ariaLabel="hourglass-loading"
            wrapperStyle={{}}
            wrapperClass=""
            colors={["#306cce", "#72a1ed"]}
          />
        </div>
      ) : (
        <div className="mx-auto w-full sm:w-4/5 md:w-3/5 lg:w-2/5 px-4">
          {posts.map((item) => (
            <div key={item.$id}>
              <TweetCard {...item} />
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default ForYou;
