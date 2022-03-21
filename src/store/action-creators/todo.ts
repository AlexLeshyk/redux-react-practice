import { Dispatch } from "react";
import axios from "axios";
import { TodoAction, TodoActionsTypes } from "../../types/todo";

export const fetchTodos = (page: number, limit: number) => {
  return async (dispatch: Dispatch<TodoAction>) => {
    try {
      dispatch({ type: TodoActionsTypes.FETCH_TODOS });
      const response = await axios.get("https://jsonplaceholder.typicode.com/todos", {
        params: { _page: page, _limit: limit },
      });
      setTimeout(() => {
        dispatch({ type: TodoActionsTypes.FETCH_TODOS_SUCCESS, payload: response.data });
      }, 500);
    } catch (e) {
      dispatch({
        type: TodoActionsTypes.FETCH_TODOS_ERROR,
        payload: "Произошла ошибка при загрузке списка дел",
      });
    }
  };
};

export const setTodoPage = (page: number): TodoAction => {
  return { type: TodoActionsTypes.SET_TODO_PAGE, payload: page };
};
