import todoReducer, { todoSlice, fetchTodos } from "../todoSlice";

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
});
