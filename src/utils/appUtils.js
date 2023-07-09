import {
  ATTRIBUTE_LIST,
  MODIFIER_POINT_OF_REFERENCE,
  SKILL_LIST,
} from "../consts";

export const buildAttributesMapWithDefaults = () =>
  ATTRIBUTE_LIST.reduce(
    (accumulated, attr) => ({
      ...accumulated,
      [attr]: { points: MODIFIER_POINT_OF_REFERENCE, modifier: 0 },
    }),
    {}
  );

export const buildSkillsMapWithDefaults = () =>
  SKILL_LIST.reduce(
    (accumulated, { name, attributeModifier }) => ({
      ...accumulated,
      [name]: { attributeModifier, points: 0 },
    }),
    {}
  );

export const buildCharacterMap = (id) => ({
  id,
  attributes: buildAttributesMapWithDefaults(),
  skills: buildSkillsMapWithDefaults(),
  lastSkillCheck: null,
  selectedClass: null,
});

export const computeSkillTotalPointsForSelectedSkill = (
  character,
  selectedSkill
) => {
  const { skills, attributes } = character;
  const skill = skills[selectedSkill] || {};
  const attribute = attributes[skill.attributeModifier] || {};

  const skillTotalPoints = skill.points + attribute.modifier;

  return skillTotalPoints;
};
