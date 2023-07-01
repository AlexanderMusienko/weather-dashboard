import React from "react";
import s from "./style.module.css";
import { resolveWeatherIcon } from "../../utils/resolveWeatherIcon";

const noData = {
  forecast: {
    forecastday: [
      {
        hour: [],
      },
    ],
  },
};

export default function DayForecast({ weatherData }) {
  const {
    forecast: {
      forecastday: [{ hour }],
    },
  } = weatherData ? weatherData : noData;

  console.log(hour);

  const filteredHours = hour.filter(({ time_epoch }) => {
    const currentHour = new Date().getHours();
    const itemHour = new Date(time_epoch * 1000).getHours();

    return currentHour <= itemHour;
  });

  const hoursCards = filteredHours.map(
    ({ temp_c, wind_kph, time_epoch, is_day, condition: { code } }) => {
      const time = new Date(time_epoch * 1000).toLocaleTimeString(undefined, {
        hour: "numeric",
        minute: "numeric",
      });

      const icon = resolveWeatherIcon(code, is_day);

      return (
        <div className={s.cardContainer} key={time_epoch + " forecastCard"}>
          <span className={s.timeText}>{time}</span>
          <div className={s.imageWrapper}>
            <img src={icon} />
          </div>
          <span className={s.tempText}>
            {Math.round(temp_c)} <sup className={s.tempUnit}>°C</sup>
          </span>
          <span className={s.windInfo}>{wind_kph} km/h</span>
        </div>
      );
    }
  );

  return (
    <div className={s.dayWeatherWrapper}>
      <div className={s.dayWeatherContainer}>{hoursCards}</div>
    </div>
  );
}
