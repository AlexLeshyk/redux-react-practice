export interface IUser {
  id: number;
  name: string;
  username: string;
  email: string;
  address: IAddress;
}

export interface ISendForm {
  name: string;
  email: string;
  terms: boolean;
  amount: number;
  text: string;
  currency: string;
}

export interface IAddress {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
}

export interface UsersState {
  users: IUser[];
  loading: boolean;
  error: null | string;
}

export interface IUserFilter {
  query: string;
  sort: any;
}

export enum UsersActionTypes {
  FETCH_USERS = "FETCH_USERS",
  FETCH_USERS_SUCCESS = "FETCH_USERS_SUCCESS",
  FETCH_USERS_ERROR = "FETCH_USERS_ERROR",
  FETCH_USERS_SEARCH = "FETCH_USERS_SEARCH",
  DELETE_USER = "DELETE_USER",
  ADD_USER = "ADD_USER",
}

interface FetchUsersAction {
  type: UsersActionTypes.FETCH_USERS;
}

interface FetchUsersSuccessAction {
  type: UsersActionTypes.FETCH_USERS_SUCCESS;
  payload: IUser[];
}

interface DeleteUserAction {
  type: UsersActionTypes.DELETE_USER;
  payload: number;
}

interface AddUserAction {
  type: UsersActionTypes.ADD_USER;
  payload: IUser;
}

interface FetchUsersErrorAction {
  type: UsersActionTypes.FETCH_USERS_ERROR;
  payload: string;
}

interface FetchUsersSearchAction {
  type: UsersActionTypes.FETCH_USERS_SEARCH;
  payload: string;
}

export type UsersAction =
  | FetchUsersAction
  | FetchUsersSuccessAction
  | FetchUsersErrorAction
  | FetchUsersSearchAction
  | DeleteUserAction
  | AddUserAction;
