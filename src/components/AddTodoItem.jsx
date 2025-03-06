import { useDispatch } from "react-redux";
import { addTodo } from "../store/todoSlice";
import { useState } from "react";

const AddTodoItem = () => {
  const dispatch = useDispatch();
  const [task, setTask] = useState("");

  return (
    <>
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        data-testid="redux textbox"
      />
      <button onClick={() => dispatch(addTodo(task))}>Add</button>
    </>
  );
};

export default AddTodoItem;
