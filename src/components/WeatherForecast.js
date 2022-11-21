import React from "react";

export default function WeatherForecast({ forecastData }) {

  const weekday = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

    const noData = {
      forecast: {
        forecastday: [
          {
            date: "2022-11-12",
            day: {
              mintemp_c: 30,
              maxtemp_c: 30,
              condition: { code: 1000 },
            },
          },
          {
            date: "2022-11-12",
            day: {
              mintemp_c: 30,
              maxtemp_c: 30,
              condition: { code: 1000 },
            },
          },
          {
            date: "2022-11-12",
            day: {
              mintemp_c: 30,
              maxtemp_c: 30,
              condition: { code: 1000 },
            },
          },
        ],
      },
    };

    const {
      forecast: { forecastday },
    } = forecastData ? forecastData : noData;

    const card = (tempMax, tempMin, dateDM, weekday) => {
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "10px",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              style={{ width: "45px", height: "45px", marginRight: "5px" }}
            />{" "}
            {/* icon prop */}
            <span style={{ fontSize: "20px", width: "70px" }}>
              {tempMax}/<span style={{ fontSize: "15px" }}>{tempMin}</span>
            </span>
          </div>

          <span style={{ fontSize: "15px" }}>{dateDM}</span>
          <span style={{ fontSize: "15px" }}>{weekday}</span>
        </div>
      );
    };

    const mappedCards = forecastday.map((item) =>
      card(
        item.day.maxtemp_c,
        item.day.mintemp_c,
        new Date(item.date).toLocaleDateString("EN-us", {
          day: "numeric",
          month: "long",
        }),
        weekday[new Date(item.date).getDay()]
      )
    );

  return <>
  {mappedCards}
  </>;
}
