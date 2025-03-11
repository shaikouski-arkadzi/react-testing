import { fetchTodos, addTodos } from "../todoSlice";

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

  it("should handle fetch error", async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
    });

    const dispatch = vi.fn();
    const getState = vi.fn();
    const response = await fetchTodos()(dispatch, getState, undefined);

    expect(response.payload).toBe("Can't fetch");
    expect(response.type).toBe("todos/fetch/rejected");
    expect(response.meta.rejectedWithValue).toBe(true);
  });
});

describe("addTodos thunk", () => {
  it("should return correct data in successfull request", async () => {
    const mockDispatch = vi.fn();
    const mockGetState = vi.fn();

    // Мокаем fetch с успешным ответом
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            id: 101,
            title: "Test",
            completed: false,
          }),
      })
    );

    const result = await addTodos("Test")(
      mockDispatch,
      mockGetState,
      undefined
    );

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      "https://jsonplaceholder.typicode.com/todos",
      expect.any(Object)
    );

    expect(result.meta.requestStatus).toBe("fulfilled");
    expect(result.payload).toEqual({
      id: 101,
      title: "Test",
      completed: false,
    });
  });

  it("should call rejectWithValue in wrong request", async () => {
    const mockDispatch = vi.fn();
    const mockGetState = vi.fn();

    // Мокаем fetch с ошибкой
    global.fetch = vi.fn(() => Promise.reject(new Error("Failed to add todo")));

    const result = await addTodos("Test")(
      mockDispatch,
      mockGetState,
      undefined
    );

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(result.meta.requestStatus).toBe("rejected");
    expect(result.payload).toBe("Failed to add todo");
  });
});
