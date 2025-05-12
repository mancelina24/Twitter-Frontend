import axios from "axios";

const API_BASE_URL = "http://localhost:3000/workintech/twitter/tweet"; // Backend API URL

export const getAllTweets = async () => {
  const response = await axios.get(API_BASE_URL, {
    withCredentials: true,
  });
  return response.data;
};

export const createTweet = async (tweetData) => {
  const response = await axios.post(`${API_BASE_URL}/create`, tweetData, {
    withCredentials: true,
  });
  return response.data;
};
