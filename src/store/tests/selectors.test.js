import { selectorTodos } from "../selectors";

describe("redux selectors", () => {
  it("should select todos from store", () => {
    const todos = [{ id: 123, text: "test", completed: false }];

    const result = selectorTodos({ todos });

    expect(result).toEqual(todos);
  });
});
