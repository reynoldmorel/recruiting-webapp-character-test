import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Class from "./Class";
import { CLASS_LIST } from "../consts";
import { buildAttributesMapWithDefaults } from "../utils/appUtils";

describe("Class", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render class properly", () => {
    const attributesDefaults = buildAttributesMapWithDefaults();
    const attributes = {
      ...attributesDefaults,
      Strength: { points: 14, modifier: 2 },
    };
    render(<Class classes={CLASS_LIST} attributes={attributes} />);

    expect(screen.getByText("Barbarian")).toBeInTheDocument();
    expect(screen.getByText("Wizard")).toBeInTheDocument();
    expect(screen.getByText("Barbarian")).toHaveAttribute(
      "style",
      "color: green;"
    );
  });

  it("should select a class", () => {
    const onSelectClass = jest.fn();
    const attributes = buildAttributesMapWithDefaults();

    render(
      <Class
        classes={CLASS_LIST}
        attributes={attributes}
        onSelectClass={onSelectClass}
      />
    );

    userEvent.click(screen.getByText("Barbarian"));

    expect(onSelectClass).toHaveBeenCalledWith("Barbarian");
  });
});
