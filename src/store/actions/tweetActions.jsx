import * as tweetService from "../../services/tweetService";

export const fetchTweets = () => async (dispatch) => {
  dispatch({ type: "FETCH_TWEETS_REQUEST" });
  try {
    const tweets = await tweetService.getAllTweets();
    dispatch({ type: "FETCH_TWEETS_SUCCESS", payload: tweets });
  } catch (error) {
    dispatch({ type: "FETCH_TWEETS_FAILURE", payload: error.message });
  }
};

export const addTweet = (tweetData) => async (dispatch) => {
  try {
    const newTweet = await tweetService.createTweet(tweetData);
    dispatch({ type: "ADD_TWEET_SUCCESS", payload: newTweet });
  } catch (error) {
    console.error("Tweet eklenirken hata oluştu:", error);
  }
};
