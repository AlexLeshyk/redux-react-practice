import React, { useEffect } from "react";
import TodoItem from "./todoItem";
import TodoPagination from "./todoPagination";
import { useActions } from "../hooks/useAction";
import { useSelector } from "react-redux";
import { RootState } from "../store/reducers";

const TodoList: React.FC = () => {
  const { loading, error, todos, page, limit } = useSelector((state: RootState) => state.todo);
  const { fetchTodos } = useActions();
  const pages = [1, 2, 3, 4, 5, 6, 7, 8];
  useEffect(() => {
    fetchTodos({ page, limit });
    // eslint-disable-next-line
  }, [page]);

  if (loading === "loading") {
    return <h1>Идет загрузка...</h1>;
  }

  if (error) {
    return <h1>{error}</h1>;
  }

  return (
    <div>
      {todos.map((item) => (
        <TodoItem todoItem={item} key={item.id} />
      ))}
      <div style={{ display: "flex" }}>
        {pages.map((item) => (
          <TodoPagination pageItem={item} key={item} />
        ))}
      </div>
    </div>
  );
};

export default TodoList;
