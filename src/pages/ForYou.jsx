import React from "react";
import { useSelector } from "react-redux";
import { TweetCard } from "../components";

function ForYou() {
  const posts = useSelector((state) => state.tweets.tweets);
  console.log(posts);

  return (
    <div>
      {posts.map((item) => (
        <div key={item.id}>
          <TweetCard {...item} />
        </div>
      ))}
    </div>
  );
}

export default ForYou;
