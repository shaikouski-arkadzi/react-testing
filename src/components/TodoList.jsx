import { useSelector } from "react-redux";
import { selectorTodos } from "../store/selectors";
import TodoItem from "./TodoItem";

const TodoList = () => {
  const todos = useSelector(selectorTodos);

  return (
    <ul>
      {todos.map((el) => (
        <TodoItem key={el.id} {...el} />
      ))}
    </ul>
  );
};

export default TodoList;
