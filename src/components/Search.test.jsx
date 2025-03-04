import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, vi } from "vitest";
import Search from "./Search";

const onChange = vi.fn();

describe("Search component", () => {
  test("render Search component", () => {
    render(
      <Search value="" onChange={onChange}>
        Find:
      </Search>
    );
    expect(screen.getByText(/find/i)).toBeInTheDocument();
  });

  test("onChange works", async () => {
    render(
      <Search value="" onChange={onChange}>
        Find:
      </Search>
    );
    await userEvent.type(screen.getByRole("textbox"), "Test");
    expect(onChange).toHaveBeenCalledTimes(4);
  });
});
