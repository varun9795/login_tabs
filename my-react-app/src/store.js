import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import {
  userReducer,
  deleteReducer,
  allUsersReducer,
} from "./Reducers/userReducer";

const reducer = combineReducers({
  user: userReducer,
  deleteUser: deleteReducer,
  allusers:allUsersReducer
});

const middleware = [thunk];

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;