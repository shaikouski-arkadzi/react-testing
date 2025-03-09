import { useDispatch } from "react-redux";
import { toggleComplete, removeTodo } from "../store/todoSlice";

const TodoItem = ({ id, text, completed }) => {
  const dispatch = useDispatch();

  return (
    <li>
      <input
        type="checkbox"
        checked={completed}
        onChange={() => dispatch(toggleComplete(id))}
      />
      {text}
      <button
        data-testid="remove item"
        onClick={() => dispatch(removeTodo(id))}
      >
        &times;
      </button>
    </li>
  );
};

export default TodoItem;
