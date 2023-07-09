import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SkillCheckSection from "./SkillCheckSection";
import { buildCharacterMap } from "../utils/appUtils";
import { act } from "react-dom/test-utils";

describe("SkillCheck", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render skill check section properly", () => {
    const character = buildCharacterMap(1);

    render(<SkillCheckSection getCharacter={() => character} />);

    expect(screen.getByRole("button", { name: "Roll" })).toBeInTheDocument();
    expect(screen.getByRole("spinbutton")).toBeInTheDocument();
    expect(screen.getByText("Acrobatics")).toBeInTheDocument();
  });

  it("should render skill check section in party mode", () => {
    const character = buildCharacterMap(1);

    render(<SkillCheckSection getCharacter={() => character} party />);

    expect(screen.getByText("Skill Section (PARTY MODE)")).toBeInTheDocument();
  });

  it("should roll the character", () => {
    const characterDefaults = buildCharacterMap(1);
    const character = {
      ...characterDefaults,
      lastSkillCheck: {
        dc: "10",
        rolledNumber: 6,
        selectedSkill: "Acrobatics",
        selectedSkillTotalPoints: 0,
      },
    };
    const onLastSkillCheck = jest.fn();

    render(
      <SkillCheckSection
        getCharacter={() => character}
        onLastSkillCheck={onLastSkillCheck}
      />
    );

    act(() => {
      userEvent.clear(screen.getByRole("spinbutton"));
    });

    act(() => {
      userEvent.type(screen.getByRole("spinbutton"), "10");
    });

    act(() => {
      userEvent.click(screen.getByRole("button", { name: "Roll" }));
    });

    expect(screen.getByText("Skill: Acrobatics: 0")).toBeInTheDocument();
    expect(screen.getByText("You Rolled: 6")).toBeInTheDocument();
    expect(screen.getByText("The DC was: 10")).toBeInTheDocument();

    expect(onLastSkillCheck).toHaveBeenCalledWith(
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
        lastSkillCheck: {
          dc: "10",
          rolledNumber: 6,
          selectedSkill: "Acrobatics",
          selectedSkillTotalPoints: 0,
        },
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
