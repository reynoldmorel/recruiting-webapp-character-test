import SkillControl from "./SkillControl";

const Skills = ({
  attributes,
  skills,
  onSetSkills,
  disableIncrease,
  totalSkillPointsAvailable,
}) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "10px",
    }}
  >
    <h1>Skills</h1>
    <span
      style={{ padding: "20px 0px" }}
    >{`Total skill points available: ${totalSkillPointsAvailable}`}</span>
    {Object.entries(skills).map(([skill, { points, attributeModifier }]) => (
      <SkillControl
        key={`skill-pc-${skill}`}
        controlKey={skill}
        points={points}
        onUpdatePoints={onSetSkills}
        attributeName={attributeModifier}
        attributeModifierValue={attributes[attributeModifier].modifier}
        disableIncrease={disableIncrease}
      />
    ))}
  </div>
);

export default Skills;
