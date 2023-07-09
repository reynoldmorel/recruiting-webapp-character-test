import SkillCheck from "./SkillCheck";
import SkillCheckResults from "./SkillCheckResults";

const SkillCheckSection = ({ getCharacter, onLastSkillCheck, party }) => {
  const character = getCharacter();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "10px",
      }}
    >
      <h1>{`Skill Section${party ? " (PARTY MODE)" : ""}`}</h1>
      <SkillCheck getCharacter={getCharacter} onRoll={onLastSkillCheck} />
      {character && character.lastSkillCheck && (
        <SkillCheckResults
          character={character}
          selectedSkillTotalPoints={
            character.lastSkillCheck.selectedSkillTotalPoints
          }
          selectedSkill={character.lastSkillCheck.selectedSkill}
          dc={character.lastSkillCheck.dc}
          rolledNumber={character.lastSkillCheck.rolledNumber}
        />
      )}
    </div>
  );
};

export default SkillCheckSection;
