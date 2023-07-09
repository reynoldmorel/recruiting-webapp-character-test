import { useEffect, useState } from "react";
import "./App.css";
import Character from "./components/Character";
import {
  buildCharacterMap,
  getCharacterWithHighestTotalPointsForSkill,
} from "./utils/appUtils";
import SkillCheckSection from "./components/SkillCheckSection";
import { API_HOST } from "./consts";

function App() {
  const [characters, setCharacters] = useState({});
  const [idSeq, setIdSeq] = useState(1);
  const [characterForPartySkillSection, setCharacterForPartySkillSection] =
    useState(null);

  useEffect(() => {
    fetch(`${API_HOST}/api/{reynoldmorel}/character`)
      .then((response) => response.json())
      .then(({ body }) => setCharacters(body || {}));
  }, []);

  const onResetCharacters = () => {
    setCharacters(
      Object.entries(characters).reduce(
        (accumulated, [id]) => ({
          ...accumulated,
          [id]: buildCharacterMap(id),
        }),
        {}
      )
    );

    setCharacterForPartySkillSection(null);
  };

  const onAddNewCharacter = () => {
    setCharacters({ ...characters, [idSeq]: buildCharacterMap(idSeq) });
    setIdSeq(idSeq + 1);
  };

  const updateCharacter = (character, prop, value) =>
    setCharacters({
      ...characters,
      [character.id]: { ...character, [prop]: value },
    });

  const onSaveAllCharacters = () =>
    fetch(`${API_HOST}/api/{reynoldmorel}/character`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(characters),
    });

  const onLastSkillCheck = (value, character) =>
    setCharacterForPartySkillSection({
      ...character,
      lastSkillCheck: value,
    });

  const onGetCharacterWithHighestTotalPointsForSkill = (
    selectedSkill,
    force
  ) => {
    if (!characterForPartySkillSection || force) {
      const character = getCharacterWithHighestTotalPointsForSkill(
        characters,
        selectedSkill
      );

      return character;
    }

    return characterForPartySkillSection;
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>React Coding Exercise</h1>
      </header>
      <section className="App-section">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div style={{ margin: "10px" }}>
            <button style={{ margin: "0px 5px" }} onClick={onAddNewCharacter}>
              Add New Character
            </button>
            <button style={{ margin: "0px 5px" }} onClick={onResetCharacters}>
              Reset All Characters
            </button>
            <button style={{ margin: "0px 5px" }} onClick={onSaveAllCharacters}>
              Save All Characters
            </button>
          </div>
          <div style={{ width: "100%" }}>
            <SkillCheckSection
              getCharacter={onGetCharacterWithHighestTotalPointsForSkill}
              onLastSkillCheck={onLastSkillCheck}
              party
            />
          </div>
          <div style={{ width: "100%" }}>
            {Object.values(characters).map((character) => (
              <Character
                key={character.id}
                character={character}
                onUpdateCharacter={(prop, value) =>
                  updateCharacter(character, prop, value)
                }
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
