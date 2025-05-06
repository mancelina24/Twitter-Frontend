import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTweets } from "../store/actions/tweetActions";
import Tweet from "./Tweet";

const TweetList = () => {
  const dispatch = useDispatch();
  const { tweets, loading, error } = useSelector((state) => state.tweets);

  useEffect(() => {
    dispatch(fetchTweets());
  }, [dispatch]);

  if (loading) {
    return <div className="text-center">Yükleniyor...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center">Hata: {error}</div>;
  }

  return (
    <div className="space-y-4">
      {tweets.map((tweet) => (
        <Tweet key={tweet.id} tweet={tweet} />
      ))}
    </div>
  );
};

export default TweetList;
