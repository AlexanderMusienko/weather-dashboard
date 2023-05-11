import React from "react";
import notAvailable from "@icons/not-available.svg";

export default function WeatherForecast({ forecastData, weatherDaySVG }) {
  const weekday = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

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

  const {
    forecast: { forecastday },
  } = forecastData ? forecastData : noData;

  const card = (tempMax, tempMin, dateDM, weekday, iconPath, key) => {
    return (
      <div
        key={key + dateDM}
        style={{
          display: "grid",
          gridTemplateColumns: "1.5fr 1fr 1fr",
          justifyContent: "center",
          alignItems: "center",
          scrollSnapAlign: 'center',
          zIndex: 0
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "start",
            alignItems: "center",
          }}
        >
          <img alt="weather" src={iconPath} style={{ height: "55px", marginRight: "5px" }} />

          <span style={{ fontSize: "25px" }}>
            {tempMax}/<span style={{ fontSize: "15px" }}>{tempMin}</span>
          </span>
        </div>

        <span style={{ fontSize: "15px", textAlign: "end" }}>{dateDM}</span>
        <span style={{ fontSize: "15px", textAlign: "end" }}>{weekday}</span>
      </div>
    );
  };

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

  const mappedCards = forecastday.map(
    (item, index) =>
      !isDateToday(item.date) &&
      card(
        item.day.maxtemp_c > 0 ? "+" + item.day.maxtemp_c : item.day.maxtemp_c,
        item.day.mintemp_c > 0 ? "+" + item.day.mintemp_c : item.day.mintemp_c,
        new Date(item.date).toLocaleDateString("EN-us", {
          day: "numeric",
          month: "long",
        }),
        weekday[new Date(item.date).getDay()], // getting num value of weekday and putting it as array key
        weatherDaySVG.filter((iconPath) => iconPath.includes(item.day.condition.code))[0] || notAvailable,
        index
      )
  );

  return <>{mappedCards}</>;
}
