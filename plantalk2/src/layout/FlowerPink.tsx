import React from "react";

function FlowerPink() {
  return (
    <div style={{ position: "relative" }}>
      {/* ピンクの花を背景にする */}
      <div
        style={{
          width: "20vw",
          height: "20vw",
          backgroundImage: 'url("/img/pinkFlower.svg")',
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          marginRight: "10px",
        }}
      />
      {/* 緑の花を右下に配置 */}
      <img
        src="/img/greenFlower.svg"
        alt="flower"
        style={{
          width: "15vw",
          position: "absolute",
          top: "60px",
          right: 0,
        }}
      />
    </div>
  );
}

export default FlowerPink;
