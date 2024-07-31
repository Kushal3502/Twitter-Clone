import React from "react";
import appwriteService from "../appwrite/config";
import { Link } from "react-router-dom";

function TweetCard({ name, content, featuredImage, $id }) {
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
        <div className="mb-2">
          {content}
          {featuredImage && (
            <div>
              <img
                src={appwriteService.getFilePreview(featuredImage)}
                className="mt-2 rounded w-full max-h-80 object-contain"
              />
            </div>
          )}
        </div>
        <div className="flex justify-between text-gray-500 text-sm p-4">
          <span className="cursor-pointer hover:text-white">Reply</span>
          <span className="cursor-pointer hover:text-white">Retweet</span>
          <span className="cursor-pointer hover:text-white">Like</span>
          <span className="cursor-pointer hover:text-white">Share</span>
        </div>
      </Link>
    </div>
  );
}

export default TweetCard;
