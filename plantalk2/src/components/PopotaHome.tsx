import React from "react";
import { ReactSVG } from "react-svg";
import "./Popota.css";
import Icon from "../../public/img/popota.svg";
import { useLocation } from "react-router-dom";

function PopotaHome() {
  const location = useLocation();
  return (
    <div className="popota-container">
      <div className="bubble">
        {location.state.user.plants.map(
          (plant: { id: string; species: string; speciesName: string }) => (
            <div key={plant.id}>
              <div>{location.state.responseTextFlower}</div>
            </div>
          )
        )}
      </div>
      <img src={Icon} alt="popota" />
    </div>
  );
}

export default PopotaHome;
