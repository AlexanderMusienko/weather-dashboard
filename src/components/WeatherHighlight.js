import React from "react";

export default function WeatherHighlight({ icon, date, temperature, weatherCondition }) {
  return (
    <div style={{ display: "flex" }}>
      <img src={icon} />
      <div style={{ display: "flex", flexDirection: "column" }}>
        <span>{date}</span>
        <span>{temperature}</span>
        <span>{weatherCondition}</span>
      </div>
    </div>
  );
}
