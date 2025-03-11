import { fetchTodos } from "../todoSlice";

global.fetch = vi.fn();

describe("todoThunk", () => {
  it("should fetchTodos with resolved response", async () => {
    fetch.mockResolvedValue({
      ok: true,
      json: async () => [{ id: 1, title: "Test Todo", completed: false }],
    });

    const dispatch = vi.fn();
    const getState = vi.fn();
    const thunk = await fetchTodos()(dispatch, getState, undefined);

    expect(thunk.payload).toEqual([
      { id: 1, title: "Test Todo", completed: false },
    ]);
    expect(thunk.type).toBe("todos/fetch/fulfilled");
  });
});
