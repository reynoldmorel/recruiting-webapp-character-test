import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AttributeControl from "./AttributeControl";

describe("AttributeControl", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render attribute control properly", () => {
    render(
      <AttributeControl
        controlKey="testingControlKey"
        points={10}
        modifier={0}
      />
    );

    expect(screen.getByRole("button", { name: "+" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "-" })).toBeInTheDocument();
    expect(
      screen.getByText("testingControlKey: 10(Modifier: 0)")
    ).toBeInTheDocument();
  });

  it("should update points", () => {
    const onUpdatePoints = jest.fn();

    render(
      <AttributeControl
        controlKey="testingControlKey"
        points={10}
        modifier={0}
        onUpdatePoints={onUpdatePoints}
      />
    );

    userEvent.click(screen.getByRole("button", { name: "+" }));
    userEvent.click(screen.getByRole("button", { name: "-" }));

    expect(onUpdatePoints).toHaveBeenNthCalledWith(1, "testingControlKey", 11);
    expect(onUpdatePoints).toHaveBeenNthCalledWith(2, "testingControlKey", 9);
  });

  it("should not decrease points if points is already 0", () => {
    const onUpdatePoints = jest.fn();

    render(
      <AttributeControl
        controlKey="testingControlKey"
        points={0}
        modifier={0}
        onUpdatePoints={onUpdatePoints}
      />
    );

    userEvent.click(screen.getByRole("button", { name: "-" }));

    expect(onUpdatePoints).toHaveBeenCalledTimes(0);
  });

  it("should not increase points if disable increase is true", () => {
    const onUpdatePoints = jest.fn();

    render(
      <AttributeControl
        controlKey="testingControlKey"
        points={10}
        modifier={0}
        onUpdatePoints={onUpdatePoints}
        disableIncrease
      />
    );

    userEvent.click(screen.getByRole("button", { name: "+" }));

    expect(onUpdatePoints).toHaveBeenCalledTimes(0);
  });
});
