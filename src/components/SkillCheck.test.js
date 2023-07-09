import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SkillCheck from "./SkillCheck";
import { buildCharacterMap } from "../utils/appUtils";
import { act } from "react-dom/test-utils";

describe("SkillCheck", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render skill check properly", () => {
    render(<SkillCheck />);

    expect(screen.getByRole("button", { name: "Roll" })).toBeInTheDocument();
    expect(screen.getByRole("spinbutton")).toBeInTheDocument();
    expect(screen.getByText("Acrobatics")).toBeInTheDocument();
  });

  it("should roll the character", () => {
    const character = buildCharacterMap(1);
    const onRoll = jest.fn();
    const getCharacter = jest.fn().mockImplementation(() => character);

    render(<SkillCheck getCharacter={getCharacter} onRoll={onRoll} />);

    act(() => {
      userEvent.clear(screen.getByRole("spinbutton"));
    });

    act(() => {
      userEvent.type(screen.getByRole("spinbutton"), "10");
    });

    act(() => {
      userEvent.click(screen.getByRole("button", { name: "Roll" }));
    });

    expect(getCharacter).toBeCalledWith("Acrobatics", true);

    expect(onRoll).toHaveBeenCalledWith(
      expect.objectContaining({
        dc: "10",
        selectedSkill: "Acrobatics",
        selectedSkillTotalPoints: 0,
      }),
      {
        attributes: {
          Charisma: { modifier: 0, points: 10 },
          Constitution: { modifier: 0, points: 10 },
          Dexterity: { modifier: 0, points: 10 },
          Intelligence: { modifier: 0, points: 10 },
          Strength: { modifier: 0, points: 10 },
          Wisdom: { modifier: 0, points: 10 },
        },
        id: 1,
        lastSkillCheck: null,
        selectedClass: null,
        skills: {
          Acrobatics: { attributeModifier: "Dexterity", points: 0 },
          "Animal Handling": { attributeModifier: "Wisdom", points: 0 },
          Arcana: { attributeModifier: "Intelligence", points: 0 },
          Athletics: { attributeModifier: "Strength", points: 0 },
          Deception: { attributeModifier: "Charisma", points: 0 },
          History: { attributeModifier: "Intelligence", points: 0 },
          Insight: { attributeModifier: "Wisdom", points: 0 },
          Intimidation: { attributeModifier: "Charisma", points: 0 },
          Investigation: { attributeModifier: "Intelligence", points: 0 },
          Medicine: { attributeModifier: "Wisdom", points: 0 },
          Nature: { attributeModifier: "Intelligence", points: 0 },
          Perception: { attributeModifier: "Wisdom", points: 0 },
          Performance: { attributeModifier: "Charisma", points: 0 },
          Persuasion: { attributeModifier: "Charisma", points: 0 },
          Religion: { attributeModifier: "Intelligence", points: 0 },
          "Sleight of Hand": { attributeModifier: "Dexterity", points: 0 },
          Stealth: { attributeModifier: "Dexterity", points: 0 },
          Survival: { attributeModifier: "Wisdom", points: 0 },
        },
      }
    );
  });
});
