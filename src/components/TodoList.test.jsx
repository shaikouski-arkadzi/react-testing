import { describe, it } from "vitest";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import TodoList from "../components/TodoList";
import store from "../store/store";

describe("TodoList Component", () => {
  it("matches the snapshot", () => {
    const { asFragment } = render(
      <Provider store={store}>
        <TodoList />
      </Provider>
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
