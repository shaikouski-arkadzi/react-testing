import { describe, it, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import * as reduxHooks from "react-redux";
import { Provider } from "react-redux";
import TodoItem from "../components/TodoItem";
import store from "../store/store";
import { toggleComplete, removeTodo } from "../store/todoSlice";

vi.mock("react-redux", async () => {
  const actual = await vi.importActual("react-redux");
  return {
    ...actual,
    useSelector: vi.fn(),
    useDispatch: vi.fn(),
  };
});

describe("todoItem Component", () => {
  it("matches the snapshot", () => {
    reduxHooks.useDispatch.mockReturnValue(vi.fn());

    const component = render(
      <Provider store={store}>
        <TodoItem id={1} text="task 1" completed={false} />
      </Provider>
    );

    expect(component).toMatchSnapshot();
  });

  it("should dispatch toggle action", () => {
    const dispatch = vi.fn();
    reduxHooks.useDispatch.mockReturnValue(dispatch);

    render(
      <Provider store={store}>
        <TodoItem id={1} text="task 1" completed={false} />
      </Provider>
    );

    fireEvent.click(screen.getByRole("checkbox"));

    expect(dispatch)
      .toHaveBeenCalled()
      .toHaveBeenCalledTimes(1)
      .toHaveBeenCalledWith(toggleComplete(1));
  });

  it("should dispatch remove action", () => {
    const dispatch = vi.fn();
    reduxHooks.useDispatch.mockReturnValue(dispatch);

    render(
      <Provider store={store}>
        <TodoItem id={1} text="task 1" completed={false} />
      </Provider>
    );

    fireEvent.click(screen.getByTestId("remove item"));

    expect(dispatch)
      .toHaveBeenCalled()
      .toHaveBeenCalledTimes(1)
      .toHaveBeenCalledWith(removeTodo(1));
  });
});
