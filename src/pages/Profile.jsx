import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import appwriteService from "../appwrite/config";
import { TweetCard } from "../components";
import { Hourglass } from "react-loader-spinner";

function Profile() {
  const userData = useSelector((state) => state.auth.userData);
  const [tweet, setTweet] = useState(null);
  const [loader, setLoader] = useState(false);
  console.log(tweet);

  useEffect(() => {
    setLoader(true);
    appwriteService.getUserPosts(userData.$id).then((posts) => {
      console.log(posts);
      setTweet(posts.documents);
      setLoader(false);
    });
  }, [userData.$id]);

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
        <div className="mx-auto w-full sm:w-4/5 md:w-3/5 lg:w-2/5 px-4 mt-10">
          <div className="flex items-center py-8 border-b mb-8">
            <img
              src="https://cdn3.iconfinder.com/data/icons/web-design-and-development-2-6/512/87-1024.png"
              alt="User avatar"
              className="w-24 h-24 rounded-full border-2 border-gray-300"
            />
            <div className="ml-4 text-white">
              <h2 className="text-2xl font-bold">{userData.name}</h2>
              <p className="text-gray-300">@{userData.$id}</p>
            </div>
          </div>
          <div>
            <h2 className="text-gray-200 text-3xl mt-3">Posts</h2>
            {tweet &&
              tweet.map((tweet) => (
                <div key={tweet.$id}>
                  <TweetCard
                    name={tweet.name}
                    content={tweet.content}
                    featuredImage={tweet.featuredImage}
                    $id={tweet.$id}
                    userId={tweet.userId}
                    initialLikes={tweet.likes}
                  />
                </div>
              ))}
          </div>
        </div>
      )}
    </>
  );
}

export default Profile;
