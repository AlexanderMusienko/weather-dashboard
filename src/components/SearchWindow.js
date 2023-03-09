import React from "react";

export default function SearchWindow({ foundedCountriesList, onClickFunc, onChangeFunc, onClickRegion }) {
  const jsxFoundedCountries = foundedCountriesList.map((country) => (
    <button className="region-button" key={country} value={country.toLowerCase()} onClick={onClickRegion}>
      {country}
    </button>
  ));

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
        zIndex: 1
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
        style={{
          display: "flex",
          overflow: "hidden",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "50%",
          maxWidth: "450px",
          maxHeight: "450px",
          padding: "20px",
          backgroundColor: "#15151570",
          border: "1px solid #141414",
          borderRadius: "20px",
          zIndex: 1,
        }}
      >
        <input
          onChange={onChangeFunc}
          placeholder="Search Your Location"
          type={"search"}
          style={{
            width: "100%",
            maxWidth: "450px",
            fontSize: "20px",
            margin: "0 auto",
            marginBottom: jsxFoundedCountries.length === 0 ? "0" : "25px",
            padding: "10px 20px",
            borderRadius: "15px",
            color: "black",
          }}
        />
        <div
          style={{
            display: "flex",
            width: "100%",
            gap: "15px",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          {jsxFoundedCountries}
        </div>
      </div>
    </div>
  );
}
