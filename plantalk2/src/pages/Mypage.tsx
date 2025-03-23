import React from "react";
import { useLocation } from "react-router-dom";

function Mypage() {
  const location = useLocation();
  console.log("location", location.state);
  console.log("userName", location.state.user.name);
  console.log("userEmail", location.state.user.email);
  console.log("plants", location.state.user.plants);
  return (
    <div>
      Mypage
      <div>userName:{location.state.user.name}</div>
      <div>userEmail:{location.state.user.email}</div>
      {location.state.user.plants.map(
        (plant: { id:string;species: string; speciesName: string }) => (
          <div key={plant.id}>
            <div>植物の種類:{plant.species}</div>
            <div>植物の名前:{plant.speciesName}</div>
          </div>
        )
      )}
    </div>
  );
}

export default Mypage;
