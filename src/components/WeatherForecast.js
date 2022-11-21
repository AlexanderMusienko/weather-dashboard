import React from "react";

export default function WeatherForecast({ forecastData }) {

    const noData = {
        forecast: {
          forecastDay: [
            {
              date: 2022-11-12,
              day: {
                mintemp_c: 30,
                maxtemp_c: 30,
                condition: { code: 1000 },
              },
            },
            {
              date: 2022-11-12,
              day: {
                mintemp_c: 30,
                maxtemp_c: 30,
                condition: { code: 1000 },
              },
            },
            {
              date: 2022-11-12,
              day: {
                mintemp_c: 30,
                maxtemp_c: 30,
                condition: { code: 1000 },
              },
            },
          ],
        },
      }

  const {
    forecast: {
      forecastDay: [
        {
          date,
          day: {
            mintemp_c,
            maxtemp_c,
            condition: { code },
          },
        },
      ],
    },
  } = forecastData ? forecastData : noData;

  const card = (tempMax, tempMin, dateDM, weekday) => {
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
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
        <img style={{ width: "45px", marginRight: "5px" }} /> 
        <span style={{ fontSize: "20px" }}>
          {tempMax}/<span style={{ fontSize: "15px" }}>{tempMin}</span>
        </span>
      </div>

      <span style={{ fontSize: "15px" }}>{dateDM}</span>
      <span style={{ fontSize: "15px" }}>{weekday}</span>
    </div>;
  };

  const mappedCards = forecastDay.map(() => card(mintemp_c, maxtemp_c, date, 'Tuesday'));

  return <>{mappedCards}</>;
}
