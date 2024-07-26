import React from "react";
import appwriteService from "../appwrite/config";

function TweetCard({ name, content, featuredImage }) {
  return (
    <div className="border border-gray-600 rounded-lg p-4 max-w-md mx-auto my-4 bg-gray-900 shadow-sm text-white">
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
      <div className=" mb-2">
        {featuredImage && (
          <div>
            <img src={appwriteService.getFilePreview(featuredImage)} />
          </div>
        )}
        {content}
      </div>
      <div className="flex justify-between text-gray-500 text-sm">
        <span>Reply</span>
        <span>Retweet</span>
        <span>Like</span>
        <span>Share</span>
      </div>
    </div>
  );
}

export default TweetCard;
