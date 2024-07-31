import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Tweet } from "../components";
import appwriteService from "../appwrite/config";

function EditTweet() {
  const { slug } = useParams();
  const [tweet, setTweet] = useState(null);

  useEffect(() => {
    appwriteService.getPost(slug).then((post) => setTweet(post));
  }, []);

  console.log(tweet);

  return (
    <div className="h-full flex items-center">
      {tweet && <Tweet post={tweet} />}
    </div>
  );
}

export default EditTweet;
