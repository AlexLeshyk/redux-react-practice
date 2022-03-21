import { Dispatch } from "react";
import { IUser, UsersAction, UsersActionTypes } from "../../types/users";
import axios from "axios";

export const fetchUsers = () => {
  return async (dispatch: Dispatch<UsersAction>, getState: () => void) => {
    try {
      dispatch({ type: UsersActionTypes.FETCH_USERS });
      // console.log("getState", getState());
      // const response = await fetch("https://jsonplaceholder.typicode.com/users");
      // const data = await response.json();
      const response = await axios.get("https://jsonplaceholder.typicode.com/users?_limit=5");
      setTimeout(() => {
        dispatch({ type: UsersActionTypes.FETCH_USERS_SUCCESS, payload: response.data });
      }, 500);
    } catch (e) {
      dispatch({
        type: UsersActionTypes.FETCH_USERS_ERROR,
        payload: "Произошла ошибка при загрузке пользователей",
      });
    }
  };
};

export const deleteUserById = (id: number) => {
  return {
    type: UsersActionTypes.DELETE_USER,
    payload: id,
  };
};

export const addUser = (value: IUser) => {
  return {
    type: UsersActionTypes.ADD_USER,
    payload: value,
  };
};

export const searchQuery = async (query: unknown) => {
  return async (dispatch: Dispatch<UsersAction>) => {
    try {
      dispatch({ type: UsersActionTypes.FETCH_USERS });
      const result = await axios.get(`https://jsonplaceholder.typicode.com/users?query=${query}`);
      console.log("query", result.data);
      setTimeout(() => {
        dispatch({ type: UsersActionTypes.FETCH_USERS_SUCCESS, payload: result.data });
      }, 500);
    } catch (e) {
      dispatch({
        type: UsersActionTypes.FETCH_USERS_ERROR,
        payload: "Произошла ошибка при поиске...",
      });
    }
  };
};
