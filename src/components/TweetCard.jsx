import React from "react";
import appwriteService from "../appwrite/config";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { BookmarkButton, LikeButton } from "./";

function TweetCard({ name, content, featuredImage, $id, initialLikes }) {
  const currentUser = useSelector((state) => state.auth.userData);

  return (
    <div className="border border-gray-600 rounded-lg p-4 mx-auto my-4 bg-gray-900 shadow-sm text-white w-full max-w-xl lg:mx-auto">
      <Link to={`/tweet/${$id}`}>
        <div className="flex items-center mb-2">
          <img
            src="https://cdn3.iconfinder.com/data/icons/web-design-and-development-2-6/512/87-1024.png"
            alt="User avatar"
            className="w-10 h-10 rounded-full mr-3"
          />
          <div>
            <h2 className="text-lg font-semibold">{name}</h2>
          </div>
        </div>
        <div className="mb-2 border-b-2 border-gray-600 pb-4">
          {content}
          {featuredImage && (
            <div className="mt-2">
              <img
                src={appwriteService.getFilePreview(featuredImage).href}
                className=" rounded w-full max-h-80 object-contain"
              />
            </div>
          )}
        </div>
      </Link>
      <div className="flex justify-between text-gray-500 text-sm p-2 px-8">
        <span className="cursor-pointer hover:text-white">Reply</span>
        <span className="cursor-pointer hover:text-white">Retweet</span>
        <span className="cursor-pointer hover:text-white">
          <LikeButton
            currentUserId={currentUser.$id}
            tweetId={$id}
            initialLikes={initialLikes?.length}
          />
        </span>
        <span className="cursor-pointer hover:text-white">
          <BookmarkButton currentUserId={currentUser.$id} tweetId={$id} />
        </span>
      </div>
    </div>
  );
}

export default TweetCard;
