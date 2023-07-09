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
