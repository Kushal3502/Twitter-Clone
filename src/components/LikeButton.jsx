import React, { useEffect, useState } from "react";
import appwriteService from "../appwrite/config";
import { useDispatch } from "react-redux";
import { updateTweetLikes } from "../store/slices/postSlice";

function LikeButton({ currentUserId, tweetId, initialLikes }) {
  const [likeCount, setLikeCount] = useState(initialLikes || 0);
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    appwriteService.getPost(tweetId).then((res) => {
      const postLikes = res.likes || [];
      console.log(postLikes);
      console.log(currentUserId);
      setLikes(postLikes);
      const idx = postLikes.indexOf(String(currentUserId));
      console.log(idx);
      setLiked(idx !== -1);
    });
  }, [tweetId, currentUserId]);

  const handleLike = async () => {
    let updatedLikes;
    const idx = likes.indexOf(currentUserId);

    if (idx == -1) {
      updatedLikes = [...likes, currentUserId];
      setLiked(true);
    } else {
      updatedLikes = [...likes.slice(0, idx), ...likes.slice(idx + 1)];
      setLiked(false);
    }
    setLikeCount(updatedLikes.length);
    console.log(updatedLikes);
    appwriteService
      .updateLikes(tweetId, updatedLikes)
      .then((item) => dispatch(updateTweetLikes(tweetId, currentUserId)));
  };

  return (
    <button onClick={handleLike} className="flex gap-1 items-center">
      {liked ? (
        <img
          src="https://img.icons8.com/?size=100&id=7697&format=png&color=FF3131"
          className="w-4 h-4"
        />
      ) : (
        <img
          src="https://img.icons8.com/?size=100&id=87&format=png&color=4B5563"
          className="w-4 h-4"
        />
      )}
      (<span>{likeCount}</span>)
    </button>
  );
}

export default LikeButton;
