import React from "react";

export default function GetInfoButton(props) {
  return (
    <div style={{ display: "flex", alignItems: "center", marginLeft: "30px" }}>
      <button
        onClick={props.onClickButtonFunc}
        style={{ color: "black", padding: "5px", marginRight: "20px" }}
      >
        Get data
      </button>
      <label>
        <input
          onClick={props.onClickCheckboxFunc}
          type={"checkbox"}
          style={{ width: "30px" }}
        />{" "}
        Are you sure about that?
      </label>
    </div>
  );
}
