import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTodoPage } from "../store/action-creators/todo";
import { RootState } from "../store/reducers";

interface TodoPaginationProps {
  pageItem: number;
}

const TodoPagination: React.FC<TodoPaginationProps> = ({ pageItem }) => {
  const dispatch = useDispatch();
  const { page } = useSelector((state: RootState) => state.todo);

  return (
    <div
      onClick={() => dispatch(setTodoPage(pageItem))}
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
