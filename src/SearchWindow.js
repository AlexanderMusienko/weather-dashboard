import React from "react";

export default function SearchWindow({ foundedItems, onClickFunc }) {
  return (
    <div
      className="outer-window"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        top: 0,
        right: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "#00000080",
        backdropFilter: "blur(10px)",
      }}
    >
      <div
        className="backdrop"
        onClick={onClickFunc}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
          top: 0,
          right: 0,
          width: "100vw",
          height: "100vh",
        }}
      />
      <div
        className="inner-window"
        tabIndex={"100"}
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "50%",
          maxWidth: "450px",
          padding: "20px",
          backdropFilter: "blur(10px)",
          backgroundColor: "#00000050",
          borderRadius: "20px",
          gap: "15px",
        }}
      >
        <input
          placeholder="Search Your Location"
          type={"search"}
          style={{
            width: "100%",
            maxWidth: "450px",
            fontSize: "20px",
            margin: "0 auto",
            padding: "10px 20px",
            borderRadius: "15px",
            color: "black",
          }}
        />
        {foundedItems}
      </div>
    </div>
  );
}
