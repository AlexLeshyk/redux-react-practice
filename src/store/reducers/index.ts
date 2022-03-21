import { combineReducers } from "redux";
import { simpleReducer } from "./simpleReducer";
import { todoReducer } from "./todoReducer";
import { userReducer } from "./userReducer";

export const rootReducer = combineReducers({
  user: userReducer,
  todo: todoReducer,
  counter: simpleReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
