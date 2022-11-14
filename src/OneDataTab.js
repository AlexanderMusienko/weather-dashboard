import React from "react";
import { Count } from "reaviz";

export default function OneDataTab({ header, dataValue, unitValue, additionalInfo }) {
  return (
    <div style={{ backgroundColor: "#00000070", padding: "10px", width: "230px", borderRadius: "15px" }}>
      <h6 style={{ marginBottom: "10px" }}>{header}</h6>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "top" }}>
        <span style={{ fontSize: "25px" }}>
          <Count to={dataValue} />
          {unitValue}
        </span>
        <span style={{ fontSize: "12px", wordWrap: "normal", maxWidth: "50%" }}>{additionalInfo}</span>
      </div>
    </div>
  );
}
