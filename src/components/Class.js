const Class = ({ classes, attributes, onSelectClass }) => (
  <div style={{ display: "flex", flexDirection: "column", padding: "10px" }}>
    <h1>Classes</h1>
    {Object.entries(classes).map(([name, classAttributes]) => (
      <span
        onClick={() => onSelectClass(name)}
        key={`cls-${name}`}
        style={{
          color: Object.entries(classAttributes).every(
            ([name, minPoints]) => attributes[name].points >= minPoints
          )
            ? "green"
            : undefined,
        }}
      >
        {name}
      </span>
    ))}
  </div>
);

export default Class;
