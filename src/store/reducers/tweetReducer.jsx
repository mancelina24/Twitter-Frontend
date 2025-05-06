const initialState = {
  tweets: [],
  loading: false,
  error: null,
};
const tweetReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_TWEETS_REQUEST":
      return { ...state, loading: true, error: null };
    case "FETCH_TWEETS_SUCCESS":
      return { ...state, tweets: action.payload, loading: false };
    case "FETCH_TWEETS_FAILURE":
      return { ...state, loading: false, error: action.payload };
    case "ADD_TWEET_SUCCESS":
      return {
        ...state,
        tweets: [...state.tweets, action.payload],
        loading: false,
      };
    default:
      return state;
  }
};

export default tweetReducer;
