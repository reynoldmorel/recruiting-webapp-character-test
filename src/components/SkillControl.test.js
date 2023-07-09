import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SkillControl from "./SkillControl";

describe("SkillControl", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render skill control properly", () => {
    render(
      <SkillControl
        controlKey="testingControlKey"
        points={5}
        attributeName="testingAttributeName"
        attributeModifierValue={4}
      />
    );

    expect(screen.getByRole("button", { name: "+" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "-" })).toBeInTheDocument();
    expect(
      screen.getByText(
        "testingControlKey: 5(Modifier: testingAttributeName): 4"
      )
    ).toBeInTheDocument();
    expect(screen.getByText("Total: 9")).toBeInTheDocument();
  });

  it("should update points", () => {
    const onUpdatePoints = jest.fn();

    render(
      <SkillControl
        controlKey="testingControlKey"
        points={5}
        attributeName="testingAttributeName"
        attributeModifierValue={4}
        onUpdatePoints={onUpdatePoints}
      />
    );

    userEvent.click(screen.getByRole("button", { name: "+" }));
    userEvent.click(screen.getByRole("button", { name: "-" }));

    expect(onUpdatePoints).toHaveBeenNthCalledWith(1, "testingControlKey", 6);
    expect(onUpdatePoints).toHaveBeenNthCalledWith(2, "testingControlKey", 4);
  });

  it("should not decrease points if points is already 0", () => {
    const onUpdatePoints = jest.fn();

    render(
      <SkillControl
        controlKey="testingControlKey"
        points={0}
        attributeName="testingAttributeName"
        attributeModifierValue={0}
        onUpdatePoints={onUpdatePoints}
      />
    );

    userEvent.click(screen.getByRole("button", { name: "-" }));

    expect(onUpdatePoints).toHaveBeenCalledTimes(0);
  });

  it("should not increase points if disable increase is true", () => {
    const onUpdatePoints = jest.fn();

    render(
      <SkillControl
        controlKey="testingControlKey"
        points={5}
        attributeName="testingAttributeName"
        attributeModifierValue={4}
        onUpdatePoints={onUpdatePoints}
        disableIncrease
      />
    );

    userEvent.click(screen.getByRole("button", { name: "+" }));

    expect(onUpdatePoints).toHaveBeenCalledTimes(0);
  });
});
