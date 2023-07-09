import {
  buildAttributesMapWithDefaults,
  buildSkillsMapWithDefaults,
  buildCharacterMap,
  computeSkillTotalPointsForSelectedSkill,
} from "./appUtils";

describe("appUtils", () => {
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
});
