export interface TodoState {
  todos: ITodo[];
  loading: boolean;
  error: null | string;
  page: number;
  limit: number;
}

export interface ITodo {
  id: number;
  title: string;
  completed: boolean;
}

export enum TodoActionsTypes {
  FETCH_TODOS = "FETCH_TODOS",
  FETCH_TODOS_SUCCESS = "FETCH_TODOS_SUCCESS",
  FETCH_TODOS_ERROR = "FETCH_TODOS_ERROR",
  SET_TODO_PAGE = "SET_TODO_PAGE",
}

interface FetchTodoAction {
  type: TodoActionsTypes.FETCH_TODOS;
}

interface FetchTodoSuccessAction {
  type: TodoActionsTypes.FETCH_TODOS_SUCCESS;
  payload: ITodo[];
}

interface FetchTodoErrorAction {
  type: TodoActionsTypes.FETCH_TODOS_ERROR;
  payload: string;
}

interface SetTodoPage {
  type: TodoActionsTypes.SET_TODO_PAGE;
  payload: number;
}

export type TodoAction =
  | FetchTodoAction
  | FetchTodoSuccessAction
  | FetchTodoErrorAction
  | SetTodoPage;
