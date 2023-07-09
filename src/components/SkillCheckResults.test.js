import { render, screen } from "@testing-library/react";
import SkillCheckResults from "./SkillCheckResults";
import { buildCharacterMap } from "../utils/appUtils";

describe("SkillCheckResults", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render skill check results properly", () => {
    const character = buildCharacterMap(1);
    render(
      <SkillCheckResults
        character={character}
        selectedSkill="Acrobatics"
        selectedSkillTotalPoints={10}
        dc={15}
        rolledNumber={6}
      />
    );

    expect(screen.getByText("Character: 1")).toBeInTheDocument();
    expect(screen.getByText("Skill: Acrobatics: 10")).toBeInTheDocument();
    expect(screen.getByText("You Rolled: 6")).toBeInTheDocument();
    expect(screen.getByText("The DC was: 15")).toBeInTheDocument();
    expect(screen.getByText("Result: Successful")).toBeInTheDocument();
  });

  it("should render skill check results with failure result", () => {
    const character = buildCharacterMap(1);
    render(
      <SkillCheckResults
        character={character}
        selectedSkill="Acrobatics"
        selectedSkillTotalPoints={10}
        dc={20}
        rolledNumber={6}
      />
    );

    expect(screen.getByText("Result: Failure")).toBeInTheDocument();
  });
});
