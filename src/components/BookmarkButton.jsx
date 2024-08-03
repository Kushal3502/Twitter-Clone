import React, { useEffect, useState } from "react";
import appwriteService from "../appwrite/config";

function BookmarkButton({ currentUserId, tweetId }) {
  const [bookmarks, setBookmarks] = useState([]);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    appwriteService.getPost(tweetId).then((res) => {
      console.log(res);
      const postBookmarks = res.bookmarks || [];
      setBookmarks(postBookmarks);
      const idx = postBookmarks.indexOf(String(currentUserId));
      console.log(idx);
      setSaved(idx !== -1);
    });
  }, [tweetId, currentUserId, saved]);

  const handleBookmarks = async () => {
    let updatedBookmarks;
    const idx = bookmarks.indexOf(currentUserId);

    if (idx === -1) {
      updatedBookmarks = [...bookmarks, currentUserId];
      setSaved(true);
    } else {
      updatedBookmarks = [
        ...bookmarks.slice(0, idx),
        ...bookmarks.slice(idx + 1),
      ];
      setSaved(false);
    }
    setBookmarks(updatedBookmarks);

    appwriteService
      .updateBookmarks(tweetId, updatedBookmarks)
      .then((res) => console.log(res));
  };

  return (
    <div>
      <button onClick={handleBookmarks}>
        {saved ? (
          <img
            src="https://img.icons8.com/?size=100&id=26083&format=png&color=4B5563"
            className="w-7 h-5"
          />
        ) : (
          <img
            src="https://img.icons8.com/?size=100&id=25157&format=png&color=4B5563"
            className="w-7 h-5"
          />
        )}
      </button>
    </div>
  );
}

export default BookmarkButton;
