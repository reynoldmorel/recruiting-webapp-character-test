import Controls from "./Controls";
import ModifierText from "./ModifierText";

const SkillControl = ({
  controlKey,
  points,
  onUpdatePoints,
  attributeName,
  attributeModifierValue,
  disableIncrease,
}) => {
  const totalSkillPoints = points + attributeModifierValue;

  const disableDecrease = points <= 0;

  const onIncreasePoints = () => {
    if (!disableIncrease) {
      onUpdatePoints(controlKey, points + 1);
    }
  };

  const onDecreasePoints = () => {
    if (!disableDecrease) {
      onUpdatePoints(controlKey, points - 1);
    }
  };

  return (
    <div style={{ display: "flex", padding: "5px", alignItems: "center" }}>
      <ModifierText
        text={controlKey}
        points={points}
        modifierValue={attributeName}
        totalModifier={attributeModifierValue}
      />
      <Controls
        disableIncrease={disableIncrease}
        disableDecrease={disableDecrease}
        onIncrease={onIncreasePoints}
        onDecrease={onDecreasePoints}
      />
      <span>{`Total: ${totalSkillPoints}`}</span>
    </div>
  );
};

export default SkillControl;
