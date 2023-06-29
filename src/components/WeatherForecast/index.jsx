import React from "react";
import notAvailable from "@icons/not-available.svg";
import s from "./style.module.css";

const noData = {
  forecast: {
    forecastday: [
      {
        date: "2022-11-12",
        day: {
          maxtemp_c: 30,
          mintemp_c: -20,
          condition: { code: 1000 },
        },
      },
      {
        date: "2022-11-12",
        day: {
          maxtemp_c: 30,
          mintemp_c: 30,
          condition: { code: 1000 },
        },
      },
      {
        date: "2022-11-12",
        day: {
          maxtemp_c: 30,
          mintemp_c: 30,
          condition: { code: 1000 },
        },
      },
    ],
  },
};

const weekday = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

function isDateToday(dateString) {
  // dateString format - yyyy-mm-dd

  function getShortDate(innerDateString) {
    return new Date(innerDateString).toLocaleDateString("fr-CA", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    });
  }
  const comparedDate = getShortDate(dateString);

  const today = getShortDate(new Date());

  return today === comparedDate;
}

export default function WeatherForecast({ forecastData, weatherDaySVG }) {
  const {
    forecast: { forecastday },
  } = forecastData ? forecastData : noData;

  if (forecastday.length === 3) {
    console.warn(
      "Forecastday data is not full (only two days of forecast will be shown). Using free api. For full api usage update api key"
    );
  }

  const card = (tempMax, tempMin, dateDM, weekday, iconPath, key) => {
    tempMax = Math.round(tempMax);
    tempMin = Math.round(tempMin);
    tempMax = tempMax > 0 ? "+" + tempMax : tempMax;
    tempMin = tempMin > 0 ? "+" + tempMin : tempMin;

    return (
      <div key={key + dateDM} className={s.cardContainer}>
        <div className={s.cardWeatherContainer}>
          <img alt="weather" src={iconPath} className={s.weatherIcon} />

          <span style={{ fontSize: "25px" }}>
            {tempMax}/<span style={{ fontSize: "15px" }}>{tempMin}</span>
          </span>
        </div>

        <span className={s.dateText}>{dateDM}</span>
        <span className={s.weekdayText}>{weekday}</span>
      </div>
    );
  };

  const mappedCards = forecastday.map(
    (item, index) =>
      !isDateToday(item.date) &&
      card(
        item.day.maxtemp_c,
        item.day.mintemp_c,
        new Date(item.date).toLocaleDateString("EN-us", {
          day: "numeric",
          month: "short",
        }),
        weekday[new Date(item.date).getDay()], // getting num value of weekday and putting it as array key
        weatherDaySVG.filter((iconPath) =>
          iconPath.includes(item.day.condition.code)
        )[0] || notAvailable,
        index
      )
  );

  return <>{mappedCards}</>;
}