import { useMemo } from "react";
import { IUser } from "../types/users";

export type IUsersKeys = "email" | "name" | "username";
export type IAddressKeys = "city" | "street";

export const useSortedUsersList = (users: IUser[], item: IUsersKeys): IUser[] => {
  const sortedPosts = useMemo(() => {
    if (item) {
      return [...users].sort((a: IUser, b: IUser) => (a[item] > b[item] ? 1 : -1));
    }
    return users;
  }, [item, users]);

  return sortedPosts;
};

export const useUsersList = (users: IUser[], sort: any, query: string): IUser[] => {
  const sortedUsers = useSortedUsersList(users, sort);

  const searchedPosts = useMemo(
    () => sortedUsers.filter((user) => user.name.toLowerCase().includes(query.toLowerCase())),
    [query, sortedUsers]
  );

  return searchedPosts;
};
