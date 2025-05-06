import React from "react";

const Tweet = ({ tweet }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <p className="text-gray-800">{tweet.content}</p>
      <div className="text-gray-500 text-sm mt-2">
        {tweet.user ? tweet.user.username : "Bilinmeyen Kullanıcı"} -{" "}
        {new Date(tweet.createdAt).toLocaleString()}
      </div>
    </div>
  );
};

export default Tweet;
