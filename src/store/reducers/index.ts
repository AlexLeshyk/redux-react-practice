import { combineReducers } from "redux";
import counter from "../slices/counter";
import users from "../slices/users";
import todos from "../slices/todo";

export const rootReducer = combineReducers({
  user: users,
  todo: todos,
  counter,
});

export type RootState = ReturnType<typeof rootReducer>;
