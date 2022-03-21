import { FC } from "react";
import { IUser } from "../types/users";

interface UserItemProps {
  user: IUser;
  onDelete: (value: number) => void;
}

const UserItem: FC<UserItemProps> = ({ user, onDelete }) => {
  const deleteUser = () => {
    onDelete(user.id);
  };
  console.log("render item");

  return (
    <div className="user-item">
      <div>{user.name}</div>
      <h5 style={{ margin: 0 }}>
        {user.username} - {user.email}
      </h5>
      <div>
        {user.address.city}/ {user.address.street}/ {user.address.suite} - {user.address.zipcode}
      </div>
      <div className="user-buttons">
        <button onClick={deleteUser}>Delete</button>
      </div>
    </div>
  );
};

export default UserItem;
