import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Attributes from "./Attributes";
import { buildAttributesMapWithDefaults } from "../utils/appUtils";

describe("Attributes", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render attributes properly", () => {
    const attributesDefaults = buildAttributesMapWithDefaults();
    const attributes = {
      ...attributesDefaults,
      Dexterity: { points: 14, modifier: 2 },
    };
    const attributesCount = Object.entries(attributes).length;

    render(<Attributes attributes={attributes} />);

    expect(screen.getAllByRole("button", { name: "+" })).toHaveLength(
      attributesCount
    );
    expect(screen.getAllByRole("button", { name: "-" })).toHaveLength(
      attributesCount
    );
    expect(screen.getByText("Dexterity: 14(Modifier: 2)")).toBeInTheDocument();
    expect(
      screen.getByText("Intelligence: 10(Modifier: 0)")
    ).toBeInTheDocument();
    expect(screen.getByText("Charisma: 10(Modifier: 0)")).toBeInTheDocument();
  });

  it("should increase attribute point", () => {
    const attributes = buildAttributesMapWithDefaults();
    const onSetAttributes = jest.fn();

    render(
      <Attributes attributes={attributes} onSetAttributes={onSetAttributes} />
    );

    const increaseButton = screen.getAllByRole("button", { name: "+" })[0];

    userEvent.click(increaseButton);

    expect(onSetAttributes).toHaveBeenCalledWith("Strength", 11);
  });

  it("should not increase attribute point because it's disabled", () => {
    const attributes = buildAttributesMapWithDefaults();
    const onSetAttributes = jest.fn();

    render(
      <Attributes
        attributes={attributes}
        onSetAttributes={onSetAttributes}
        disableIncrease
      />
    );

    const increaseButtons = screen.getAllByRole("button", { name: "+" });

    userEvent.click(increaseButtons[0]);
    userEvent.click(increaseButtons[3]);
    userEvent.click(increaseButtons[5]);

    expect(onSetAttributes).toBeCalledTimes(0);
  });
});
