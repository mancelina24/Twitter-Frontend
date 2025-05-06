import axios from "axios";
const API_BASE_URL = "http://localhost:3000/workintech/twitter/tweet"; // Backend API URL

export const getAllTweets = async () => {
  try {
    const response = await axios.get(API_BASE_URL);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createTweet = async (tweetData) => {
  try {
    const response = await axios.post(API_BASE_URL, tweetData);
    return response.data;
  } catch (error) {
    throw error;
  }
};
