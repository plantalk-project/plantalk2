import React from "react";
import { ReactSVG } from "react-svg";
import "./Popota.css";

function Popota() {
  return (
    <div>
      <div className="popota-container">
        <div className="speech-bubble-img">
          <p>こんにちは。これは例です。</p>
        </div>
        <div className="popota-img">
          <img src="/img/popota.svg" alt="popota"  style={{width:"25vh"}}/>
        </div>
      </div>
    </div>
  );
}

export default Popota;
