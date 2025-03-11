import todoReducer, { fetchTodos, addTodos } from "../todoSlice";

global.fetch = vi.fn();

describe("todoSlice extraReducers", () => {
  it("should update state when fetchTodos is fulfilled", () => {
    const previousState = [];
    const action = {
      type: fetchTodos.fulfilled.type,
      payload: [{ id: 1, title: "Test Todo", completed: false }],
    };

    const newState = todoReducer(previousState, action);
    expect(newState).toEqual([{ id: 1, title: "Test Todo", completed: false }]);
  });

  it("should add todo when addTodos is fulfilled", () => {
    const initialState = [];
    const newTodo = { id: 101, text: "Test", completed: false };

    const nextState = todoReducer(initialState, {
      type: addTodos.fulfilled.type,
      payload: newTodo,
    });

    expect(nextState).toHaveLength(1);
    expect(nextState[0]).toEqual(newTodo);
  });
});
