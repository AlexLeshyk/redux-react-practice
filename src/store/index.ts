import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import counter from "../store/slices/counter";
import users from "../store/slices/users";
import todos from "../store/slices/todo";
import postsReducer from "../store/slices/postsSlice";

const rootReducer = combineReducers({
  user: users,
  todo: todos,
  counter,
  posts: postsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: process.env.NODE_ENV !== "production",
});

// the old store
// export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
