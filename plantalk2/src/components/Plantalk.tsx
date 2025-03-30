import FlowerGreen from "../layout/Flower";
import FlowerPink from "../layout/FlowerPink";

function PlanTalk() {
  return (
    <div style={{ position: "relative" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          position: "relative",
        }}
      >
        <FlowerGreen />
        <FlowerPink />
      </div>
      <div
        style={{
          display: "flex",
          top: "70%",
          position: "absolute",
          justifyContent: "center",
          width: "100%",
          transform: "translateY(-50%)",
        }}
      >
        <img src="/img/title.svg" alt="plantalk" style={{ width: "60vw" }} />
      </div>
    </div>
  );
}

export default PlanTalk;
