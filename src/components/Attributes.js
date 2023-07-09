import AttributeControl from "./AttributeControl";

const Attributes = ({ attributes, onSetAttributes, disableIncrease }) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "10px",
    }}
  >
    <h1>Attributes</h1>
    {Object.entries(attributes).map(([attr, { points, modifier }]) => (
      <AttributeControl
        key={`attr-pc-${attr}`}
        controlKey={attr}
        points={points}
        modifier={modifier}
        onUpdatePoints={onSetAttributes}
        disableIncrease={disableIncrease}
      />
    ))}
  </div>
);

export default Attributes;
