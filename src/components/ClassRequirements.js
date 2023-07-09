const ClassRequirements = ({ name, reqs, onClose }) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "10px",
    }}
  >
    <h1>{`${name} Minimum Requirements`}</h1>
    {Object.entries(reqs).map(([attr, minPoints]) => (
      <span key={`cls-req-${attr}`}>{`${attr}: ${minPoints}`}</span>
    ))}
    <button onClick={onClose} style={{ margin: "5px 0px" }}>
      Close Requirements View
    </button>
  </div>
);

export default ClassRequirements;
