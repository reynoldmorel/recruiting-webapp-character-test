const ModifierText = ({ text, points, modifierValue, totalModifier }) => {
  const builtText = `${text}: ${points}(Modifier: ${modifierValue})`;
  const modifierText = totalModifier !== undefined
    ? `${builtText}: ${totalModifier}`
    : builtText;

  return <span>{modifierText}</span>;
};

export default ModifierText;
