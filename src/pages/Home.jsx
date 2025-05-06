import React, { useEffect } from "react";
import TweetList from "../components/TweetList";
import NewTweetForm from "../components/NewTweetForm";
import { useDispatch, useSelector } from "react-redux";
import { fetchTweets } from "../store/actions/tweetActions";

const Home = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.tweets);

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
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Anasayfa</h1>
      <NewTweetForm />
      <TweetList />
    </div>
  );
};

export default Home;
