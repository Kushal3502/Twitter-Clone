import React, { useEffect, useState } from "react";
import appwriteService from "../appwrite/config";
import { useSelector } from "react-redux";
import { Hourglass } from "react-loader-spinner";
import { TweetCard } from "../components";

function Bookmarks() {
  const [posts, setPosts] = useState([]);
  const [loader, setLoader] = useState(false);
  const userData = useSelector((state) => state.auth.userData);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    setLoader(true);
    appwriteService.getBookmarks(userData.$id).then((res) => {
      setPosts(res.documents);
      setLoader(false);
      setReload(false);
    });
  }, [reload, userData.$id]);

  return (
    <>
      <div className="text-center mt-6 mb-4">
        <h2 className="text-3xl font-bold text-white">Bookmarks</h2>
      </div>
      <div className="flex flex-col items-center px-4 py-2 overflow-auto">
        {loader ? (
          <div className="flex justify-center items-center h-96">
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
          <div className="w-full max-w-3xl">
            {posts.map((item) => (
              <div
                key={item.$id}
                className="my-4"
                onClick={() => setReload(true)}
              >
                <TweetCard {...item} />
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default Bookmarks;
