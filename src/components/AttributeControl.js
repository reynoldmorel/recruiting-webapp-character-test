import Controls from "./Controls";
import ModifierText from "./ModifierText";

const AttributeControl = ({
  controlKey,
  points,
  modifier,
  onUpdatePoints,
  disableIncrease,
}) => {
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
        modifierValue={modifier.toString()}
      />
      <Controls
        disableIncrease={disableIncrease}
        disableDecrease={disableDecrease}
        onIncrease={onIncreasePoints}
        onDecrease={onDecreasePoints}
      />
    </div>
  );
};

export default AttributeControl;
