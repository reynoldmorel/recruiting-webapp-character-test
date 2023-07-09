import {
  computeModifier,
  computeSkillPointsAvailable,
  buildAttributesMapWithDefaults,
  buildSkillsMapWithDefaults,
  buildCharacterMap,
  computeAttributesTotalPoints,
  computeSkillsTotalPoints,
  computeSkillTotalPointsForSelectedSkill,
  getCharacterWithHighestTotalPointsForSkill,
} from "./appUtils";

describe("appUtils", () => {
  it("should compute modifier and return 0", () => {
    expect(computeModifier(10, 10)).toEqual(0);
  });

  it("should compute modifier and return a negative number", () => {
    expect(computeModifier(10, 9)).toEqual(-1);
    expect(computeModifier(10, 8)).toEqual(-2);
  });

  it("should compute modifier and return a positive number per each 2 points over the reference", () => {
    expect(computeModifier(10, 12)).toEqual(1);
    expect(computeModifier(10, 13)).toEqual(1);
    expect(computeModifier(10, 14)).toEqual(2);
  });

  it("should compute skill points available", () => {
    expect(computeSkillPointsAvailable(10, 2)).toEqual(18);
    expect(computeSkillPointsAvailable(10, 1)).toEqual(14);
    expect(computeSkillPointsAvailable(10, 0)).toEqual(10);
    expect(computeSkillPointsAvailable(10, -1)).toEqual(6);
    expect(computeSkillPointsAvailable(10, -7)).toEqual(-18);
  });

  it("should build attributes map", () => {
    expect(buildAttributesMapWithDefaults()).toEqual({
      Charisma: {
        modifier: 0,
        points: 10,
      },
      Constitution: {
        modifier: 0,
        points: 10,
      },
      Dexterity: {
        modifier: 0,
        points: 10,
      },
      Intelligence: {
        modifier: 0,
        points: 10,
      },
      Strength: {
        modifier: 0,
        points: 10,
      },
      Wisdom: {
        modifier: 0,
        points: 10,
      },
    });
  });

  it("should build skills map", () => {
    expect(buildSkillsMapWithDefaults()).toEqual({
      Acrobatics: {
        attributeModifier: "Dexterity",
        points: 0,
      },
      "Animal Handling": {
        attributeModifier: "Wisdom",
        points: 0,
      },
      Arcana: {
        attributeModifier: "Intelligence",
        points: 0,
      },
      Athletics: {
        attributeModifier: "Strength",
        points: 0,
      },
      Deception: {
        attributeModifier: "Charisma",
        points: 0,
      },
      History: {
        attributeModifier: "Intelligence",
        points: 0,
      },
      Insight: {
        attributeModifier: "Wisdom",
        points: 0,
      },
      Intimidation: {
        attributeModifier: "Charisma",
        points: 0,
      },
      Investigation: {
        attributeModifier: "Intelligence",
        points: 0,
      },
      Medicine: {
        attributeModifier: "Wisdom",
        points: 0,
      },
      Nature: {
        attributeModifier: "Intelligence",
        points: 0,
      },
      Perception: {
        attributeModifier: "Wisdom",
        points: 0,
      },
      Performance: {
        attributeModifier: "Charisma",
        points: 0,
      },
      Persuasion: {
        attributeModifier: "Charisma",
        points: 0,
      },
      Religion: {
        attributeModifier: "Intelligence",
        points: 0,
      },
      "Sleight of Hand": {
        attributeModifier: "Dexterity",
        points: 0,
      },
      Stealth: {
        attributeModifier: "Dexterity",
        points: 0,
      },
      Survival: {
        attributeModifier: "Wisdom",
        points: 0,
      },
    });
  });

  it("should build character map", () => {
    expect(buildCharacterMap(1)).toEqual({
      id: 1,
      lastSkillCheck: null,
      selectedClass: null,
      attributes: {
        Charisma: {
          modifier: 0,
          points: 10,
        },
        Constitution: {
          modifier: 0,
          points: 10,
        },
        Dexterity: {
          modifier: 0,
          points: 10,
        },
        Intelligence: {
          modifier: 0,
          points: 10,
        },
        Strength: {
          modifier: 0,
          points: 10,
        },
        Wisdom: {
          modifier: 0,
          points: 10,
        },
      },
      skills: {
        Acrobatics: {
          attributeModifier: "Dexterity",
          points: 0,
        },
        "Animal Handling": {
          attributeModifier: "Wisdom",
          points: 0,
        },
        Arcana: {
          attributeModifier: "Intelligence",
          points: 0,
        },
        Athletics: {
          attributeModifier: "Strength",
          points: 0,
        },
        Deception: {
          attributeModifier: "Charisma",
          points: 0,
        },
        History: {
          attributeModifier: "Intelligence",
          points: 0,
        },
        Insight: {
          attributeModifier: "Wisdom",
          points: 0,
        },
        Intimidation: {
          attributeModifier: "Charisma",
          points: 0,
        },
        Investigation: {
          attributeModifier: "Intelligence",
          points: 0,
        },
        Medicine: {
          attributeModifier: "Wisdom",
          points: 0,
        },
        Nature: {
          attributeModifier: "Intelligence",
          points: 0,
        },
        Perception: {
          attributeModifier: "Wisdom",
          points: 0,
        },
        Performance: {
          attributeModifier: "Charisma",
          points: 0,
        },
        Persuasion: {
          attributeModifier: "Charisma",
          points: 0,
        },
        Religion: {
          attributeModifier: "Intelligence",
          points: 0,
        },
        "Sleight of Hand": {
          attributeModifier: "Dexterity",
          points: 0,
        },
        Stealth: {
          attributeModifier: "Dexterity",
          points: 0,
        },
        Survival: {
          attributeModifier: "Wisdom",
          points: 0,
        },
      },
    });
  });

  it("should compute attributes total points", () => {
    expect(
      computeAttributesTotalPoints({
        testAttribute1: { points: 5 },
        testAttribute2: { points: 10 },
      })
    ).toEqual(15);
  });

  it("should compute skills total points", () => {
    expect(
      computeSkillsTotalPoints(
        {
          testSkill1: { attributeModifier: "testAttribute1", points: 2 },
          testSkill2: { attributeModifier: "testAttribute2", points: 10 },
        },
        {
          testAttribute1: { points: 5, modifier: -5 },
          testAttribute2: { points: 10, modifier: 0 },
        }
      )
    ).toEqual(7);
  });

  it("should compute skill total points for selected skill", () => {
    expect(
      computeSkillTotalPointsForSelectedSkill(
        {
          skills: {
            testSkill1: { attributeModifier: "testAttribute1", points: 2 },
          },
          attributes: {
            testAttribute1: { points: 5, modifier: -5 },
          },
        },
        "testSkill1"
      )
    ).toEqual(-3);
  });

  it("should get character with highest total points for given skill", () => {
    const characters = {
      1: {
        id: 1,
        skills: {
          testSkill1: { attributeModifier: "testAttribute1", points: 2 },
          testSkill2: { attributeModifier: "testAttribute2", points: 11 },
        },
        attributes: {
          testAttribute1: { points: 5, modifier: -5 },
          testAttribute2: { points: 26, modifier: 8 },
        },
      },
      2: {
        id: 2,
        skills: {
          testSkill1: { attributeModifier: "testAttribute1", points: 3 },
          testSkill2: { attributeModifier: "testAttribute2", points: 10 },
        },
        attributes: {
          testAttribute1: { points: 5, modifier: -5 },
          testAttribute2: { points: 20, modifier: 5 },
        },
      },
      3: {
        id: 3,
        skills: {
          testSkill1: { attributeModifier: "testAttribute1", points: 1 },
          testSkill2: { attributeModifier: "testAttribute2", points: 8 },
        },
        attributes: {
          testAttribute1: { points: 15, modifier: 2 },
          testAttribute2: { points: 20, modifier: 5 },
        },
      },
    };

    expect(
      getCharacterWithHighestTotalPointsForSkill(characters, "testSkill1")
    ).toEqual(characters[3]);
    expect(
      getCharacterWithHighestTotalPointsForSkill(characters, "testSkill2")
    ).toEqual(characters[1]);
  });

  it("should return null when there are no characters for get character with highest total points for given skill", () => {
    const characters = {};

    expect(
      getCharacterWithHighestTotalPointsForSkill(characters, "testSkill1")
    ).toBeNull();
  });

  it("should return null when no skill is selected for get character with highest total points for given skill", () => {
    const characters = {
      1: {
        id: 1,
        skills: {
          testSkill1: { attributeModifier: "testAttribute1", points: 2 },
          testSkill2: { attributeModifier: "testAttribute2", points: 11 },
        },
        attributes: {
          testAttribute1: { points: 5, modifier: -5 },
          testAttribute2: { points: 26, modifier: 8 },
        },
      },
    };

    expect(
      getCharacterWithHighestTotalPointsForSkill(characters, null)
    ).toBeNull();
  });
});
