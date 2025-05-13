import React, { createContext, useState } from "react";

// Tweetleri depolamak için bir context oluşturuyoruz
export const TweetContext = createContext();

// TweetProvider, tweet verilerini sağlayacak ve diğer bileşenlerde erişilebilir yapacak
export const TweetProvider = ({ children }) => {
  const [tweets, setTweets] = useState([]);

  const addTweet = (tweet) => {
    setTweets([...tweets, tweet]);
  };

  return (
    <TweetContext.Provider value={{ tweets, addTweet }}>
      {children}
    </TweetContext.Provider>
  );
};
