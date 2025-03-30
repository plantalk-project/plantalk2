import React from "react";
import { ReactSVG } from "react-svg";
import "./Popota.css";
import Icon from "../../public/img/popota.svg";

function Popota() {
  return (
    <div className="popota-container">
      <div className="bubble">
        <p>こんにちは。これは例です。</p>
      </div>
      <img src={Icon} alt="popota" />
    </div>
  );
}

export default Popota;
