import React from "react";
import locationIcon from "@icons/location.svg";
import calendarIcon from "@icons/calendar.svg";
import notAvailable from "@icons/not-available.svg";
import { Count } from "reaviz";

const noData = {
  current: {
    temp_c: null,
    last_updated: null,
    condition: { text: null, icon: null },
  },
  location: { name: null, country: null },
};

export default function MainWeatherTab({ weatherData, className, buttonComponent, weatherIcon }) {

  const {
    current: {
      temp_c,
      last_updated,
      condition: { text, icon },
    },
    location: { name, country },
  } = weatherData ? weatherData : noData;

  return (
    <div className={className}>
      {buttonComponent}
      <img
        alt="weather"
        src={weatherIcon || notAvailable}
        draggable="false"
        style={{ maxWidth: "128px" }}
      />
      <span style={{ fontSize: "70px" }}>
        <Count decimalPlaces={1} to={Math.round(temp_c)} />
        <sup style={{ fontSize: "36px", fontWeight: "600" }}>°C</sup>
      </span>

      <div style={{ display: "flex", alignItems: "center" }}>
        <img alt="weather" src={icon} draggable="false" style={{ maxWidth: "25px", marginRight: "5px" }} />
        <span>{text}</span>
      </div>

      <hr style={{ marginBlock: "15px", color: "#ffffff50" }} />
      <div style={{ display: "flex", alignItems: "center", marginBottom: "15px" }}>
        <img
          alt="location"
          src={locationIcon}
          draggable="false"
          style={{ width: "15px", marginRight: "10px", filter: "opacity(0.8)" }}
        />
        <span>{`${name}, ${country}`}</span>
      </div>

      <div style={{ display: "flex", alignItems: "center" }}>
        <img
          alt="calendar"
          src={calendarIcon}
          style={{ width: "15px", marginRight: "10px", filter: "opacity(0.8)" }}
        />
        <span>{last_updated}</span>
      </div>
    </div>
  );
}