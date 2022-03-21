import React, { useCallback, useState } from "react";
import { usePrevious } from "../hooks/usePrevious";
import { ITodo } from "../types/todo";

interface TodoItemProps {
  todoItem: ITodo;
}

const TodoItem: React.FC<TodoItemProps> = ({ todoItem }) => {
  const [checkbox, setCheckbox] = useState<boolean>(todoItem.completed);

  // const prevState = usePrevious(checkbox);

  const handlerCheckbox = useCallback(() => {
    setCheckbox(!checkbox);
  }, [checkbox]);

  return (
    <div key={todoItem.id}>
      <input type="checkbox" checked={checkbox} onChange={handlerCheckbox} />
      {todoItem.id} - {todoItem.title}
    </div>
  );
};

export default TodoItem;
