import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe } from "vitest";
import { Provider } from "react-redux";
import Layout from "./Layout";
import store from "../store/store";

describe("Layout component", () => {
  test("render Layout component", () => {
    expect(
      render(
        <Provider store={store}>
          <Layout />
        </Provider>
      )
    ).toMatchSnapshot();
  });

  test("typing on Searchbox and filter works", async () => {
    render(
      <Provider store={store}>
        <Layout />
      </Provider>
    );
    await userEvent.type(screen.getByTestId("search textbox"), "Text 2");
    expect(screen.queryByDisplayValue(/Text 2/)).toBeInTheDocument();
    expect(screen.queryByDisplayValue(/Text 1/i)).toBeNull();
  });
});
