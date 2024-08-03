import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Hourglass } from "react-loader-spinner";
import { useSelector } from "react-redux";
import { BookmarkButton, LikeButton } from "../components";

function ViewTweet() {
  const { slug } = useParams();
  const [tweet, setTweet] = useState(null);
  const [loader, setLoader] = useState(false);
  const userData = useSelector((state) => state.auth.userData);
  const isAuthor = tweet && userData ? tweet.userId === userData.$id : false;

  useEffect(() => {
    setLoader(true);
    appwriteService.getPost(slug).then((post) => {
      setTweet(post);
      setLoader(false);
    });
  }, [slug]);
  console.log(tweet);
  const handleDelete = async () => {
    appwriteService
      .deletePost(tweet.$id)
      .then((res) => appwriteService.deleteFile(tweet.featuredImage));
  };

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
        <div className=" w-full flex justify-center p-4 mt-14 overflow-hidden">
          {tweet && (
            <div className="border border-gray-600 rounded-lg p-4 w-full max-w-2xl bg-gray-900 shadow-sm text-white overflow-hidden">
              <div className="flex items-center mb-2 justify-between">
                <Link to={"/profile"}>
                  <div className="flex items-center gap-2">
                    <img
                      src="https://cdn3.iconfinder.com/data/icons/web-design-and-development-2-6/512/87-1024.png"
                      alt="User avatar"
                      className="w-10 h-10 rounded-full"
                    />
                    <h2 className="text-lg font-semibold">{tweet.name}</h2>
                  </div>
                </Link>
                {isAuthor && (
                  <div className="flex gap-3">
                    <Link to={`/edit-tweet/${slug}`}>
                      <button className="bg-slate-600 hover:bg-slate-700 py-2 px-4 rounded-xl">
                        Edit
                      </button>
                    </Link>
                    <button
                      className="bg-slate-600 hover:bg-slate-700 py-2 px-4 rounded-xl"
                      onClick={handleDelete}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
              <div className="mb-2 border-b-2 border-gray-600 pb-4">
                <p>{tweet.content}</p>
                {tweet.featuredImage && (
                  <div className="mt-2">
                    <img
                      src={appwriteService.getFilePreview(tweet.featuredImage)}
                      alt="Tweet's featured"
                      className="rounded w-full h-auto object-contain"
                    />
                  </div>
                )}
              </div>
              <div className="flex justify-between text-gray-500 text-sm border-b-2 border-gray-600 pb-4 px-8">
                <span className="cursor-pointer hover:text-white">Reply</span>
                <span className="cursor-pointer hover:text-white">Retweet</span>
                <span className="cursor-pointer hover:text-white">
                  <LikeButton
                    currentUserId={userData.$id}
                    tweetId={slug}
                    initialLikes={tweet.likes?.length}
                  />
                </span>
                <span className="cursor-pointer hover:text-white">
                  <BookmarkButton currentUserId={userData.$id} tweetId={slug} />
                </span>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default ViewTweet;
