import {
  legacy_createStore as createStore,
  applyMiddleware,
  combineReducers,
} from "redux";

import { thunk } from "redux-thunk";
import logger from "redux-logger";

const rootReducerr = (state = {}, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

const store = createStore(rootReducer, applyMiddleware(thunk, logger));
export default store;
