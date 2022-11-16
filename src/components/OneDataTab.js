import React from "react";
import { Count } from "reaviz";

export default function OneDataTab({ header, dataValue, unitValue, icon, containerClassName }) {
  return (
    <div className={containerClassName}>
      <h6 style={{ marginBottom: "10px" }}>{header}</h6>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: "15px" }}>
          <Count className="one-data-value" to={dataValue} />
          {' '}
          {unitValue}
        </span>
        <img style={{height: '30px'}} src={icon} alt={header} draggable={false}/>
      </div>
    </div>
  );
}
