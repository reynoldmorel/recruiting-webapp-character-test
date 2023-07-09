import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Skills from "./Skills";
import {
  buildAttributesMapWithDefaults,
  buildSkillsMapWithDefaults,
} from "../utils/appUtils";

describe("Skills", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render skills properly", () => {
    const attributesDefaults = buildAttributesMapWithDefaults();
    const attributes = {
      ...attributesDefaults,
      Dexterity: { points: 14, modifier: 2 },
    };

    const skillsDefaults = buildSkillsMapWithDefaults();
    const skills = {
      ...skillsDefaults,
      Acrobatics: { points: 14, attributeModifier: "Dexterity" },
    };
    const skillsCount = Object.entries(skills).length;

    render(
      <Skills
        attributes={attributes}
        skills={skills}
        totalSkillPointsAvailable={0}
      />
    );

    expect(screen.getAllByRole("button", { name: "+" })).toHaveLength(
      skillsCount
    );
    expect(screen.getAllByRole("button", { name: "-" })).toHaveLength(
      skillsCount
    );
    expect(
      screen.getByText("Total skill points available: 0")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Acrobatics: 14(Modifier: Dexterity): 2")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Animal Handling: 0(Modifier: Wisdom): 0")
    ).toBeInTheDocument();
  });

  it("should increase skill point", () => {
    const onSetSkills = jest.fn();
    const attributes = buildAttributesMapWithDefaults();
    const skills = buildSkillsMapWithDefaults();

    render(
      <Skills
        attributes={attributes}
        skills={skills}
        totalSkillPointsAvailable={0}
        onSetSkills={onSetSkills}
      />
    );

    const increaseButton = screen.getAllByRole("button", { name: "+" })[0];

    userEvent.click(increaseButton);

    expect(onSetSkills).toHaveBeenCalledWith("Acrobatics", 1);
  });

  it("should not increase skill point because it's disabled", () => {
    const onSetSkills = jest.fn();
    const attributes = buildAttributesMapWithDefaults();
    const skills = buildSkillsMapWithDefaults();

    render(
      <Skills
        attributes={attributes}
        skills={skills}
        totalSkillPointsAvailable={0}
        onSetSkills={onSetSkills}
        disableIncrease
      />
    );

    const increaseButtons = screen.getAllByRole("button", { name: "+" });

    userEvent.click(increaseButtons[0]);
    userEvent.click(increaseButtons[3]);
    userEvent.click(increaseButtons[5]);

    expect(onSetSkills).toBeCalledTimes(0);
  });
});
