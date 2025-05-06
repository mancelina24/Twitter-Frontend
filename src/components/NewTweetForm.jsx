import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { addTweet } from "../store/actions/tweetActions";

const NewTweetForm = () => {
  const [content, setContent] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (content.trim() !== "") {
      dispatch(addTweet({ content })); // Sadece içeriği gönderiyoruz, backend User'ı otomatik atamalı
      setContent(""); // Formu temizle
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <textarea
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="tweetContent"
        placeholder="Ne düşünüyorsun?"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows="3"
      ></textarea>
      <div className="flex justify-end">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Tweetle
        </button>
      </div>
    </form>
  );
};

export default NewTweetForm;
