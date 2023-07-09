import { useState } from "react";
import { computeSkillTotalPointsForSelectedSkill } from "../utils/appUtils";
import { SKILL_LIST } from "../consts";

const SkillCheck = ({ onRoll, getCharacter }) => {
  const [selectedSkill, setSelectedSkill] = useState(SKILL_LIST[0].name);
  const [dc, setDc] = useState("0");

  const onSelectSkillChange = (e) => setSelectedSkill(e.target.value);

  const onClickRoll = () => {
    const character = getCharacter(selectedSkill, true);

    if (character) {
      const selectedSkillTotalPoints = computeSkillTotalPointsForSelectedSkill(
        character,
        selectedSkill
      );
      const rolledNumber = Math.floor(Math.random() * 19) + 1;

      onRoll(
        { selectedSkill, dc, rolledNumber, selectedSkillTotalPoints },
        character
      );
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "10px",
      }}
    >
      <h2>Skill Check</h2>
      <div
        style={{
          display: "flex",
          padding: "10px",
        }}
      >
        <div
          style={{
            padding: "5px",
          }}
        >
          <span>Skill</span>
          <select value={selectedSkill} onChange={onSelectSkillChange}>
            {SKILL_LIST.map((skill) => (
              <option key={skill.name} value={skill.name}>
                {skill.name}
              </option>
            ))}
          </select>
        </div>
        <div
          style={{
            padding: "5px",
          }}
        >
          <span>DC</span>
          <input
            type="number"
            value={dc}
            onChange={(e) => setDc(e.target.value)}
          />
        </div>
        <button onClick={onClickRoll}>Roll</button>
      </div>
    </div>
  );
};

export default SkillCheck;
