const SkillCheckResults = ({
  character,
  selectedSkill,
  selectedSkillTotalPoints,
  dc,
  rolledNumber,
}) => {
  const result = selectedSkillTotalPoints + rolledNumber > dc;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "10px",
      }}
    >
      <h2>Skill Check Results</h2>
      <span
        style={{
          padding: "5px",
        }}
      >{`Character: ${character.id}`}</span>
      <span
        style={{
          padding: "5px",
        }}
      >{`Skill: ${selectedSkill}: ${selectedSkillTotalPoints}`}</span>
      <span
        style={{
          padding: "5px",
        }}
      >{`You Rolled: ${rolledNumber}`}</span>
      <span
        style={{
          padding: "5px",
        }}
      >{`The DC was: ${dc}`}</span>
      <span
        style={{
          padding: "5px",
        }}
      >{`Result: ${result ? "Successful" : "Failure"}`}</span>
    </div>
  );
};

export default SkillCheckResults;
