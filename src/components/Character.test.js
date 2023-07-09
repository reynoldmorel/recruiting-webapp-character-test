import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Character from "./Character";
import { buildCharacterMap } from "../utils/appUtils";
import { act } from "react-dom/test-utils";

describe("Character", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render character properly", () => {
    const character = buildCharacterMap(1);
    render(<Character character={character} />);

    expect(screen.getByRole("button", { name: "Roll" })).toBeInTheDocument();
    expect(screen.getByText("Classes")).toBeInTheDocument();
    expect(screen.getByText("Barbarian")).toBeInTheDocument();
    expect(screen.getByText("Skill Check")).toBeInTheDocument();
    expect(screen.getByText("Acrobatics")).toBeInTheDocument();
    expect(screen.getByText("Attributes")).toBeInTheDocument();
    expect(screen.getByText("Strength: 10(Modifier: 0)")).toBeInTheDocument();
    expect(screen.getByText("Skills")).toBeInTheDocument();
    expect(
      screen.getByText("Animal Handling: 0(Modifier: Wisdom): 0")
    ).toBeInTheDocument();
  });

  it("should show class requirements for Barbarian", () => {
    const characterDefaults = buildCharacterMap(1);
    const character = { ...characterDefaults, selectedClass: "Barbarian" };

    render(<Character character={character} />);

    expect(
      screen.getByText("Barbarian Minimum Requirements")
    ).toBeInTheDocument();
    expect(screen.getByText("Strength: 14")).toBeInTheDocument();
    expect(screen.getByText("Constitution: 9")).toBeInTheDocument();
    expect(screen.getByText("Intelligence: 9")).toBeInTheDocument();
  });

  it("should update character", async () => {
    const character = buildCharacterMap(1);
    const onUpdateCharacter = jest.fn();

    render(
      <Character character={character} onUpdateCharacter={onUpdateCharacter} />
    );

    const increaseButtons = screen.getAllByRole("button", { name: "+" });

    userEvent.click(increaseButtons[0]);

    expect(onUpdateCharacter).toHaveBeenNthCalledWith(1, "attributes", {
      Charisma: { modifier: 0, points: 10 },
      Constitution: { modifier: 0, points: 10 },
      Dexterity: { modifier: 0, points: 10 },
      Intelligence: { modifier: 0, points: 10 },
      Strength: { modifier: 0, points: 11 },
      Wisdom: { modifier: 0, points: 10 },
    });

    userEvent.click(increaseButtons[10]);

    expect(onUpdateCharacter).toHaveBeenNthCalledWith(2, "skills", {
      Acrobatics: { attributeModifier: "Dexterity", points: 0 },
      "Animal Handling": { attributeModifier: "Wisdom", points: 0 },
      Arcana: { attributeModifier: "Intelligence", points: 0 },
      Athletics: { attributeModifier: "Strength", points: 0 },
      Deception: { attributeModifier: "Charisma", points: 1 },
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
    });

    userEvent.click(screen.getByText("Barbarian"));

    expect(onUpdateCharacter).toHaveBeenNthCalledWith(
      3,
      "selectedClass",
      "Barbarian"
    );

    act(() => {
      userEvent.click(screen.getByText("Roll"));
    });

    expect(onUpdateCharacter).toHaveBeenNthCalledWith(
      4,
      "lastSkillCheck",
      expect.objectContaining({
        dc: "0",
        selectedSkill: "Acrobatics",
        selectedSkillTotalPoints: 0,
      })
    );
  });
});
