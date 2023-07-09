const Controls = ({
  disableIncrease,
  disableDecrease,
  onIncrease,
  onDecrease,
}) => (
  <div style={{ display: "flex" }}>
    <button
      disabled={disableIncrease}
      onClick={onIncrease}
      style={{ margin: "0px 2px" }}
    >
      +
    </button>
    <button
      disabled={disableDecrease}
      onClick={onDecrease}
      style={{ margin: "0px 2px" }}
    >
      -
    </button>
  </div>
);

export default Controls;
