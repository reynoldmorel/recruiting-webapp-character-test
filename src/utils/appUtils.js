import { ATTRIBUTE_LIST, MODIFIER_POINT_OF_REFERENCE } from "../consts";

export const buildAttributesMapWithDefaults = () =>
  ATTRIBUTE_LIST.reduce(
    (accumulated, attr) => ({
      ...accumulated,
      [attr]: { points: MODIFIER_POINT_OF_REFERENCE, modifier: 0 },
    }),
    {}
  );
