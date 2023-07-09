import { useMemo } from "react";
import Attributes from "./Attributes";
import Skills from "./Skills";
import ClassRequirements from "./ClassRequirements";
import SkillCheckSection from "./SkillCheckSection";
import Class from "./Class";
import {
  computeModifier,
  computeSkillPointsAvailable,
  computeAttributesTotalPoints,
  computeSkillsTotalPoints,
} from "../utils/appUtils";
import {
  CLASS_LIST,
  ATTRIBUTES_MAX_POINTS,
  MODIFIER_POINT_OF_REFERENCE,
  INTELLIGENCE_ATTRIBUTE_MODIFIER,
} from "../consts";

const Character = ({ character, onUpdateCharacter }) => {
  const { attributes, skills, selectedClass } = character;

  const totalAttributePoints = computeAttributesTotalPoints(attributes);
  const totalSkillConsumedPoints = computeSkillsTotalPoints(skills, attributes);

  const intelligenceModifier =
    attributes[INTELLIGENCE_ATTRIBUTE_MODIFIER].modifier;
  const totalSkillPointsAvailable = useMemo(
    () =>
      computeSkillPointsAvailable(
        MODIFIER_POINT_OF_REFERENCE,
        intelligenceModifier
      ),
    [intelligenceModifier]
  );

  const onSetAttributes = (attribute, points) => {
    const newAttributes = {
      ...attributes,
      [attribute]: {
        points,
        modifier: computeModifier(MODIFIER_POINT_OF_REFERENCE, points),
      },
    };

    onUpdateCharacter("attributes", newAttributes);
  };

  const onSetSkills = (skill, points) => {
    const newSkills = {
      ...skills,
      [skill]: { ...skills[skill], points },
    };

    onUpdateCharacter("skills", newSkills);
  };

  const onLastSkillCheck = (value) =>
    onUpdateCharacter("lastSkillCheck", value);

  const onSetSelectedClass = (selectedClass) =>
    onUpdateCharacter("selectedClass", selectedClass);

  const reachedAttributesMaxPoints =
    totalAttributePoints >= ATTRIBUTES_MAX_POINTS;

  const reachedSkillsMaxPoints =
    totalSkillConsumedPoints >= totalSkillPointsAvailable;

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h1>{`Character: ${character.id}`}</h1>
      <div style={{ width: "100%" }}>
        <SkillCheckSection
          getCharacter={() => character}
          onLastSkillCheck={onLastSkillCheck}
        />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Attributes
              attributes={attributes}
              onSetAttributes={onSetAttributes}
              disableIncrease={reachedAttributesMaxPoints}
            />
            {reachedAttributesMaxPoints && (
              <span
                style={{ color: "red", margin: "10px, 0px" }}
              >{`Reached max number of points: ${ATTRIBUTES_MAX_POINTS} pts`}</span>
            )}
          </div>
          <Class
            classes={CLASS_LIST}
            attributes={attributes}
            onSelectClass={onSetSelectedClass}
          />
          {selectedClass && (
            <ClassRequirements
              name={selectedClass}
              reqs={CLASS_LIST[selectedClass]}
              onClose={() => onSetSelectedClass(null)}
            />
          )}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Skills
              attributes={attributes}
              skills={skills}
              onSetSkills={onSetSkills}
              disableIncrease={reachedSkillsMaxPoints}
              totalSkillPointsAvailable={totalSkillPointsAvailable}
            />
            {reachedSkillsMaxPoints && (
              <span
                style={{ color: "red", margin: "10px, 0px" }}
              >{`Reached max number of points: ${totalSkillPointsAvailable} pts`}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Character;
