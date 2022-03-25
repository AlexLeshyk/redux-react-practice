import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import counter from "../store/slices/counter";
import users from "../store/slices/users";
import todos from "../store/slices/todo";
import postsReducer from "../store/slices/postsSlice";
import usersReducer from "../store/slices/usersSlice";
import { useDispatch } from "react-redux";

const rootReducer = combineReducers({
  user: users,
  todo: todos,
  counter,
  posts: postsReducer,
  postUsers: usersReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: process.env.NODE_ENV !== "production",
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

// the old store
// export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
