import React, { useEffect } from "react";
import { fetchTodos } from "../store/action-creators/todo";
import { useDispatch } from "react-redux";
import TodoItem from "./todoItem";
import TodoPagination from "./todoPagination";
import { useTypedSelector } from "../hooks/useTypedSelector";

const TodoList: React.FC = () => {
  const { loading, error, todos, page, limit } = useTypedSelector((state) => state.todo);
  const dispatch = useDispatch();
  const pages = [1, 2, 3, 4, 5, 6, 7, 8];
  useEffect(() => {
    dispatch(fetchTodos(page, limit));
  }, [page]);

  if (loading) {
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
