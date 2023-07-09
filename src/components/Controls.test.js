import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Controls from "./Controls";

describe("Controls", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render controls properly", () => {
    render(<Controls />);

    expect(screen.getByRole("button", { name: "+" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "-" })).toBeInTheDocument();
  });

  it("should click increase / decrease buttons", () => {
    const increase = jest.fn();
    const decrease = jest.fn();

    render(<Controls onIncrease={increase} onDecrease={decrease} />);

    userEvent.click(screen.getByRole("button", { name: "+" }));
    expect(increase).toHaveBeenCalled();

    userEvent.click(screen.getByRole("button", { name: "-" }));
    expect(decrease).toHaveBeenCalled();
  });

  it("should disable increase / decrease buttons", () => {
    render(<Controls disableIncrease disableDecrease />);

    expect(screen.getByRole("button", { name: "+" })).toHaveAttribute(
      "disabled"
    );
    expect(screen.getByRole("button", { name: "-" })).toHaveAttribute(
      "disabled"
    );
  });
});
