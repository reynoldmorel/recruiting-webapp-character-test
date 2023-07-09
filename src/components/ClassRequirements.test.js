import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ClassRequirements from "./ClassRequirements";
import { CLASS_LIST } from "../consts";

describe("ClassRequirements", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render class requirements properly", () => {
    render(<ClassRequirements name="Barbarian" reqs={CLASS_LIST.Barbarian} />);

    expect(
      screen.getByText("Barbarian Minimum Requirements")
    ).toBeInTheDocument();
    expect(screen.getByText("Strength: 14")).toBeInTheDocument();
    expect(screen.getByText("Constitution: 9")).toBeInTheDocument();
    expect(screen.getByText("Intelligence: 9")).toBeInTheDocument();
  });

  it("should close class requirements", () => {
    const onClose = jest.fn();

    render(
      <ClassRequirements
        name="Barbarian"
        reqs={CLASS_LIST.Barbarian}
        onClose={onClose}
      />
    );

    userEvent.click(
      screen.getByRole("button", { name: "Close Requirements View" })
    );

    expect(onClose).toHaveBeenCalled();
  });
});
