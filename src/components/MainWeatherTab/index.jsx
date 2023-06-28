import React from "react";
import locationIcon from "@icons/location.svg";
import calendarIcon from "@icons/calendar.svg";
import notAvailable from "@icons/not-available.svg";
import { Count } from "reaviz";

import s from "./style.module.css";

const noData = {
  current: {
    temp_c: null,
    last_updated: null,
    condition: { text: null, icon: null },
  },
  location: { name: null, country: null },
};

export default function MainWeatherTab({
  weatherData,
  className,
  buttonComponent,
  weatherIcon,
}) {
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
      <div className={s.weatherIconWrapper}>
        <img
          alt="weather icon"
          src={weatherIcon || notAvailable}
          draggable="false"
        />
      </div>
      <span className={s.temperatureInfo}>
        <Count decimalPlaces={1} to={Math.round(temp_c)} />
        <sup className={s.tempUnitLabel}>°C</sup>
      </span>

      <div className="flex-align-center">
        <img
          alt="weather icon"
          src={icon}
          draggable="false"
          className={s.weatherIconLabel}
        />
        <span>{text}</span>
      </div>

      <hr className={s.separator} />
      <div className={s.geoAndTimeContainer}>
        <div className="flex-align-center">
          <img
            alt="location icon"
            src={locationIcon}
            draggable="false"
            className={s.subIcon}
          />
          <span>{`${name}, ${country}`}</span>
        </div>

        <div className="flex-align-center">
          <img
            alt="calendar icon"
            src={calendarIcon}
            className={s.subIcon}
          />
          <span>{last_updated}</span>
        </div>
      </div>
    </div>
  );
}
