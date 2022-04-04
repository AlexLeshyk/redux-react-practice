import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useActions } from "../../hooks/useAction";
import { useUsersList } from "../../hooks/useUsersList";
import { RootState } from "../../store";
import { IUser } from "../../types/users";
import Modal from "../common/modal/modal";
import Portal from "../common/modal/portal";
import TodoList from "../todoList";
import UserForm from "../userForm";
import UserList from "../userList";
import UserSearch from "../userSearch";

// interface UserPageProps {
//   value: number;
//   num: number;
//   rdnCounter: () => void;
//   incrementCounter: () => void;
//   decrementCounter: () => void;
//   fetchUsers: () => void;
//   addUser: (value: IUser) => void;
//   deleteUserById: (value: number) => void;
// }
const UsersPage = () => {
  const [filter, setFilter] = useState<{ sort: string; query: string }>({ sort: "", query: "" });
  const {
    fetchUsers,
    deleteUserById,
    addUser,
    incrementCounter,
    decrementCounter,
    rdnCounter,
    incrementByAmount,
  } = useActions();
  const { users, error, loading } = useSelector((state: RootState) => state.user);
  const { value, num } = useSelector((state: RootState) => state.counter);
  // const dispatch = useDispatch();

  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line
  }, []);

  let maxId = 10;

  const searchedAndSortedUsers = useUsersList(users, filter.sort, filter.query);

  const deleteUser = (id: number) => {
    console.log(id);
    deleteUserById(id);
  };

  const onAddUser = (user: IUser) => {
    addUser(user);
  };

  const closeModal = () => {
    setVisible(false);
  };

  const openModal = () => {
    setVisible(true);
  };

  if (loading === "loading") {
    return <h1>Loading is coming...</h1>;
  }

  if (error) {
    return <h1>{error}</h1>;
  }

  return (
    <>
      <div>Initial counter value: {value}</div>
      <div>Initial num value: {num}</div>
      <div>
        <button onClick={incrementCounter} className="button button__main">
          <div className="inner">Increment</div>
        </button>
        <button onClick={decrementCounter} className="button button__main">
          <div className="inner">Decrement</div>
        </button>
        <button
          onClick={() => rdnCounter(Math.floor(Math.random() * 10))}
          className="button button__main"
        >
          <div className="inner">Random multiple</div>
        </button>
        <button onClick={() => incrementByAmount(5)} className="button button__main">
          <div className="inner">Incr on 5</div>
        </button>
      </div>
      <button onClick={openModal} className="button button__main button__long">
        <div className="inner">Open</div>
      </button>
      <UserSearch filter={filter} setFilter={setFilter} />
      <UserList users={searchedAndSortedUsers} onDelete={deleteUser} />
      <TodoList />
      <Portal className="modal-content" el="div">
        <Modal visible={visible} close={closeModal}>
          <UserForm onAdd={onAddUser} maxId={maxId} onCloseForm={closeModal} />
        </Modal>
      </Portal>
    </>
  );
};

export default UsersPage;

// const mapStateToProps = (state: RootState) => {
//   return {
//     value: state.counter.value,
//     num: state.counter.num,
//   };
// };

// const mapDispatchToProps = (dispatch: any) => {
//   const { fetchUsers, deleteUserById, addUser, incrementCounter, decrementCounter, rdnCounter } =
//     bindActionCreators(actionCreators, dispatch);

//   return {
//     fetchUsers,
//     deleteUserById,
//     addUser,
//     incrementCounter,
//     decrementCounter,
//     rdnCounter,
//   };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(UsersPage);
