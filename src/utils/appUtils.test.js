import { buildAttributesMapWithDefaults } from "./appUtils";

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
});
