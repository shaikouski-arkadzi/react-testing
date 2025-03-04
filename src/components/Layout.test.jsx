import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe } from "vitest";
import Layout from "./Layout";

describe("Layout component", () => {
  test("render Layout component", () => {
    expect(render(<Layout />)).toMatchSnapshot();
  });

  test("typing on Searchbox and filter works", async () => {
    render(<Layout />);
    await userEvent.type(screen.getByRole("textbox"), "Text 2");
    expect(screen.queryByDisplayValue(/Text 2/)).toBeInTheDocument();
    expect(screen.queryByDisplayValue(/Text 1/i)).toBeNull();
  });
});
