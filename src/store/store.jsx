import {
  legacy_createStore as createStore,
  applyMiddleware,
  combineReducers,
} from "redux";

import { thunk } from "redux-thunk";
import tweetReducer from "./reducers/tweetReducer";
import userReducer from "./reducers/userReducer";

const rootReducer = combineReducers({
  tweets: tweetReducer,
  user: userReducer,
});

const store = createStore(
  rootReducer,
  applyMiddleware(thunk) // burada thunk eklendi
);

export default store;
