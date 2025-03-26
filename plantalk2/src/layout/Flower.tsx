import React from "react";

function FlowerGreen() {
  return (
    <div style={{ position: "relative" }}>
      {/* ピンクの花を背景にする */}
      <div
        style={{
          width: "20vw",
          height: "20vw",
          backgroundImage: 'url("/img/greenFlower.svg")',
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          marginLeft: "10px",
        }}
      />
      {/* 緑の花を右下に配置 */}
      <img
        src="/img/pinkFlower.svg"
        alt="flower"
        style={{
          width: "15vw",
          position: "absolute",
          top: "60px",
          left: 0,
        }}
      />
    </div>
  );
}

export default FlowerGreen;
