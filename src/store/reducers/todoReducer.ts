import { TodoAction, TodoActionsTypes, TodoState } from "../../types/todo";

const defaultState: TodoState = {
  todos: [],
  loading: false,
  error: null,
  limit: 5,
  page: 1,
};

export const todoReducer = (state = defaultState, action: TodoAction): TodoState => {
  switch (action.type) {
    case TodoActionsTypes.FETCH_TODOS:
      return { ...state, loading: true };
    case TodoActionsTypes.FETCH_TODOS_SUCCESS:
      return { ...state, loading: false, todos: action.payload };
    case TodoActionsTypes.FETCH_TODOS_ERROR:
      return { ...state, loading: false, error: action.payload };
    case TodoActionsTypes.SET_TODO_PAGE:
      return { ...state, page: action.payload };

    default:
      return state;
  }
};
