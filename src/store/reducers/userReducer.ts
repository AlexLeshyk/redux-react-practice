import { UsersAction, UsersActionTypes, UsersState } from "../../types/users";

const defaultState: UsersState = {
  users: [],
  loading: false,
  error: null,
};

export const userReducer = (state = defaultState, action: UsersAction): UsersState => {
  switch (action.type) {
    case UsersActionTypes.FETCH_USERS:
      return { ...state, loading: true };
    case UsersActionTypes.FETCH_USERS_SUCCESS:
      return { ...state, loading: false, users: action.payload };
    case UsersActionTypes.FETCH_USERS_ERROR:
      return { ...state, loading: false, error: action.payload };
    case UsersActionTypes.DELETE_USER:
      return { ...state, users: state.users.filter((item) => item.id !== action.payload) };
    case UsersActionTypes.ADD_USER:
      return { ...state, users: [...state.users, action.payload] };
    default:
      return state;
  }
};
