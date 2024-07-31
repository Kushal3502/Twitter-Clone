import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import appwriteService from "../appwrite/config";
import { useNavigate } from "react-router-dom";
import { addPost } from "../store/slices/postSlice";
import { Hourglass } from "react-loader-spinner";

function Tweet({ post }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const { register, handleSubmit, getValues } = useForm({
    defaultValues: {
      name: "" || post?.name,
      userId: "" || post?.userId,
      content: "" || post?.content,
      featuredImage: null || post?.featuredImage,
    },
  });
  console.log(post);
  const posts = useSelector((state) => state.tweets.tweets);
  console.log(posts);

  const userData = useSelector((state) => state.auth.userData);
  console.log(userData);

  const handlePost = async (data) => {
    console.log(data);
    setLoader(true);
    if (post) {
      const file = data.featuredImage
        ? await appwriteService.uploadFile(data.featuredImage[0])
        : null;
      if (file) {
        await appwriteService.deleteFile(post.featuredImage);
      }
      const updatedTweet = await appwriteService.updatePost(post.$id, {
        ...data,
        featuredImage: file ? file.$id : undefined,
      });
    } else {
      const image = await appwriteService.uploadFile(data.featuredImage[0]);
      console.log(image);

      data.name = userData.name;
      data.userId = userData.$id;
      data.featuredImage = image ? image.$id : null;
      const newPost = await appwriteService.createPost({ ...data });
      dispatch(addPost({ ...data }));
    }
    navigate("/");
    setLoader(false);
  };

  return (
    <>
      {loader ? (
        <div>
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
        <form
          className="p-4 border border-gray-600 rounded-md shadow-sm w-full max-w-lg mx-auto bg-gray-800"
          onSubmit={handleSubmit(handlePost)}
        >
          <textarea
            className="w-full h-32 mb-4 p-2 text-white bg-gray-900 rounded-md resize-none focus:outline-none"
            placeholder="What's happening?"
            {...register("content")}
          />
          {post && (
            <div className="w-full mb-4">
              {post.featuredImage && (
                <img
                  src={appwriteService.getFilePreview(post.featuredImage)}
                  alt={post.title}
                  className="rounded-lg"
                />
              )}
            </div>
          )}
          <div className="flex justify-between items-center">
            <div>
              <input
                type="file"
                id="fileInput"
                className="hidden"
                accept="image/png, image/jpg, image/jpeg, image/gif"
                {...register("featuredImage")}
              />
              <label
                htmlFor="fileInput"
                className="inline-block bg-green-500 text-white py-2 px-4 rounded cursor-pointer hover:bg-green-600"
              >
                Choose a file
              </label>
            </div>
            <button
              className="bg-blue-500 text-white py-2 px-6 rounded hover:bg-blue-600"
              type="submit"
            >
              Post
            </button>
          </div>
        </form>
      )}
    </>
  );
}

export default Tweet;
