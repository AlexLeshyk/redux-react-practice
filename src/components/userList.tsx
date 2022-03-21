import React from "react";
import { IUser } from "../types/users";
import UserItem from "./userItem";

interface UserListProps {
  users: IUser[];
  onDelete: (value: number) => void;
}

const UserList: React.FC<UserListProps> = ({ users, onDelete }) => {
  console.log("render list");
  if (users.length === 0) {
    return <h3>No more users</h3>;
  }
  return (
    <div className="user-list">
      {users.map((item) => (
        <UserItem
          user={item}
          key={item.id}
          onDelete={() => {
            onDelete(item.id);
          }}
        />
      ))}
    </div>
  );
};

export default UserList;
