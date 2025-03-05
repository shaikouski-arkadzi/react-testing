import todoReducer, { addTodo, removeTodo, toggleComplete } from "../todoSlice";

describe("todoSlice", () => {
  it("should return default state when init", () => {
    const result = todoReducer(undefined, { type: "" });
    expect(result).toEqual([]);
  });

  it("should add new todo item when addTodo action triggered", () => {
    const action = { type: addTodo.type, payload: "test" };

    const result = todoReducer([], action);

    expect(result[0].text).toBe("test");
    expect(result[0].completed).toBe(false);
  });

  it("should toggle todo completed status when toggleComplete action triggered", () => {
    const todos = [{ id: 123, text: "test", completed: false }];

    const action = { type: toggleComplete.type, payload: 123 };

    const result = todoReducer(todos, action);

    expect(result[0].completed).toBe(true);
  });

  it("should remove todo by id when removeTodo action triggered", () => {
    const todos = [{ id: 123, text: "test", completed: false }];

    const action = { type: removeTodo.type, payload: 123 };

    const result = todoReducer(todos, action);

    expect(result).toEqual([]);
  });
});
