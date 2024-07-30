import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Hourglass } from "react-loader-spinner";

function ViewTweet() {
  const { slug } = useParams();
  const [tweet, setTweet] = useState(null);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    setLoader(true);
    appwriteService.getPost(slug).then((post) => {
      setTweet(post);
      console.log(post);
      setLoader(false);
    });
  }, [slug]);

  console.log(tweet);

  return (
    <>
      {loader ? (
        <div className="h-full w-full flex justify-center items-center">
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
        <div className="h-full w-full flex justify-center ">
          {tweet && (
            <div className="border border-gray-600 rounded-lg p-4  w-3/6 mx-auto my-4 bg-gray-900 shadow-sm text-white">
              <div className="flex items-center mb-2">
                <img
                  src="https://cdn3.iconfinder.com/data/icons/web-design-and-development-2-6/512/87-1024.png"
                  alt="User avatar"
                  className="w-10 h-10 rounded-full mr-3"
                />
                <div>
                  <h2 className="text-lg font-semibold">{tweet.name}</h2>
                </div>
              </div>
              <div className="mb-2 border-b-2 border-gray-600 pb-4">
                {tweet.content}
                {tweet.featuredImage && (
                  <div>
                    <img
                      src={appwriteService.getFilePreview(tweet.featuredImage)}
                      alt="Tweet's featured"
                      className="mt-2 rounded w-full h-80 object-cover"
                    />
                  </div>
                )}
              </div>
              <div className="flex justify-between text-gray-500 text-sm border-b-2 border-gray-600 pb-4">
                <span className="cursor-pointer hover:text-white">Reply</span>
                <span className="cursor-pointer hover:text-white">Retweet</span>
                <span className="cursor-pointer hover:text-white">Like</span>
                <span className="cursor-pointer hover:text-white">Share</span>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default ViewTweet;
