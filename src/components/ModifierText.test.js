import { render, screen } from "@testing-library/react";
import ModifierText from "./ModifierText";

describe("ModifierText", () => {
  it("should render text, points and modifier value properly", () => {
    render(<ModifierText text="testing" points={10} modifierValue="0" />);

    expect(screen.getByText("testing: 10(Modifier: 0)")).toBeInTheDocument();
  });

  it("should render text, points, modifier value and total modifier properly", () => {
    render(
      <ModifierText
        text="testing"
        points={10}
        modifierValue={"testAttribute"}
        totalModifier={0}
      />
    );

    expect(
      screen.getByText("testing: 10(Modifier: testAttribute): 0")
    ).toBeInTheDocument();
  });
});
