import React, { useState } from "react";
import {
  BarChart,
  BarSeries,
  Count,
  Gridline,
  GridlineSeries,
  LinearXAxis,
  LinearXAxisTickSeries,
  LinearYAxis,
  LinearYAxisTickSeries,
  LineChart,
} from "reaviz";

const data = [
  { key: 1, data: 3 },
  { key: 2, data: 4 },
  { key: 3, data: 10 },
  { key: 4, data: 8 },
  { key: 5, data: 6 },
  { key: 6, data: 4 },
  { key: 7, data: 2 },
  { key: 8, data: 6 },
  { key: 9, data: 7 },
  { key: 10, data: 4 },
  { key: 11, data: 5 },
  { key: 12, data: 6 },
  { key: 13, data: 7 },
  { key: 14, data: 5 },
  { key: 15, data: 4 },
  { key: 16, data: 3 },
  { key: 17, data: 6 },
  { key: 18, data: 4 },
  { key: 19, data: 3 },
];

export default function WindStatus({ weatherData }) {
  const [currentWindSpeedFormat, setCurrentWindSpeedFormat] = useState("km/h");

  function changeWindSpeedFormat() {
    currentWindSpeedFormat === "km/h" ? setCurrentWindSpeedFormat("m/s") : setCurrentWindSpeedFormat("km/h");
  }

  const noData = {
    current: {
      last_updated: null,
      wind_kph: null,
    },
    forecast: {
      forecastday: [{ hour: [{wind_kph: 17.3}] }],
    },
  };

  const {
    current: { last_updated, wind_kph },
    forecast: {
      forecastday: [{ hour }],
    },
  } = weatherData ? weatherData : noData;

  function ejectShortTime(dateString) {
    return new Date(dateString).toLocaleTimeString([], { timeStyle: "short" });
  }

  const windDuringDayData = hour ? hour.map((item, i) => {return {key: ejectShortTime(item.time), data: item.wind_kph}}) : null;

  console.log(windDuringDayData);

  const currentWindSpeed = currentWindSpeedFormat === "km/h" ? wind_kph : wind_kph * (5 / 18);

  const currentTime = new Date(last_updated).toLocaleTimeString([], { timeStyle: "short" });

  console.log("Current time:", currentTime);

  return (
    <>
      <h5 style={{ marginBottom: "35px" }}>Wind Status</h5>

      <LineChart
        containerClassName="wind-line-chart-container"
        data={windDuringDayData}
        height={50}
        gridlines={<GridlineSeries line={<Gridline direction={null} />} />}
        center={true}
        yAxis={
          <LinearYAxis tickSeries={<LinearYAxisTickSeries line={null} label={null} />} axisLine={null} />
        }
        xAxis={
          <LinearXAxis tickSeries={<LinearXAxisTickSeries line={null} label={null} />} axisLine={null} />
        }
      />

      <BarChart
        containerClassName="wind-bar-chart-container"
        data={windDuringDayData}
        height={25}
        series={<BarSeries padding={0.6} colorScheme={"#757575"} />}
        gridlines={<GridlineSeries line={<Gridline direction={null} />} />}
        yAxis={
          <LinearYAxis tickSeries={<LinearYAxisTickSeries line={null} label={null} />} axisLine={null} />
        }
        xAxis={
          <LinearXAxis
            tickSeries={<LinearXAxisTickSeries line={null} label={null} />}
            type="category"
            axisLine={null}
          />
        }
      />

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
        }}
      >
        <span onClick={changeWindSpeedFormat} style={{ fontSize: "32px", cursor: "pointer" }}>
          <Count decimalPlaces={1} to={currentWindSpeed} />
          <span style={{ fontSize: "12px" }}> {currentWindSpeedFormat === "km/h" ? "km/h" : "m/s"}</span>
        </span>

        <span style={{ fontSize: "16px" }}>{weatherData ? currentTime : null}</span>
      </div>
    </>
  );
}
