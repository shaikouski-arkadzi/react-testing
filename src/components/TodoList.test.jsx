import { describe, it } from "vitest";
import { render } from "@testing-library/react";
import * as reduxHooks from "react-redux";
import { Provider, useSelector } from "react-redux";
import TodoList from "../components/TodoList";
import store from "../store/store";

vi.mock("react-redux", async () => {
  const actual = await vi.importActual("react-redux");
  return {
    ...actual,
    useSelector: vi.fn(),
  };
});

describe("TodoList Component", () => {
  const todos = [
    { id: 1, text: "task 1", completed: false },
    { id: 2, text: "task 2", completed: true },
  ];

  it("matches the snapshot", () => {
    useSelector.mockReturnValue([]);

    const { asFragment } = render(
      <Provider store={store}>
        <TodoList />
      </Provider>
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it("should create TodoList with todo items", () => {
    useSelector.mockReturnValue(todos);

    const { asFragment } = render(
      <Provider store={store}>
        <TodoList />
      </Provider>
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it("should create TodoList with todo items alternative test", () => {
    const useSelectorSpy = vi
      .spyOn(reduxHooks, "useSelector")
      .mockReturnValue(todos);

    const { asFragment } = render(
      <Provider store={store}>
        <TodoList />
      </Provider>
    );

    expect(asFragment()).toMatchSnapshot();
    useSelectorSpy.mockRestore();
  });
});
