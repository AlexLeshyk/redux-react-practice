import React from "react";
import { useSelector } from "react-redux";
import { useActions } from "../hooks/useAction";
import { RootState } from "../store";

interface TodoPaginationProps {
  pageItem: number;
}

const TodoPagination: React.FC<TodoPaginationProps> = ({ pageItem }) => {
  const { page } = useSelector((state: RootState) => state.todo);
  const { setTodoPage } = useActions();

  const setPage = () => setTodoPage(pageItem);

  return (
    <div
      onClick={setPage}
      style={{
        border: pageItem === page ? "2px solid green" : "1px solid gray",
        padding: "5px 10px",
        margin: 5,
      }}
    >
      {pageItem}
    </div>
  );
};

export default TodoPagination;
