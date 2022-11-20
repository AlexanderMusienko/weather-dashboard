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

  const windDuringDayData = hour
    ? hour.map((item, i) => {
        return { key: i, data: item.wind_kph };
      })
    : null;

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
          <LinearYAxis
            tickSeries={<LinearYAxisTickSeries line={null} label={null} />}
            axisLine={null}
          />
        }
        xAxis={
          <LinearXAxis
            tickSeries={<LinearXAxisTickSeries line={null} label={null} />}
            axisLine={null}
          />
        }
      />

      <BarChart
        containerClassName="wind-bar-chart-container"
        data={windDuringDayData}
        height={25}
        series={<BarSeries padding={0.6} />}
        gridlines={<GridlineSeries line={<Gridline direction={null} />} />}
        yAxis={
          <LinearYAxis
            tickSeries={<LinearYAxisTickSeries line={null} label={null} />}
            axisLine={null}
          />
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
        <span
          onClick={changeWindSpeedFormat}
          style={{ fontSize: "32px", cursor: "pointer" }}
        >
          <Count decimalPlaces={1} to={currentWindSpeed} />
          <span style={{ fontSize: "12px" }}>
            {" "}
            {currentWindSpeedFormat === "km/h" ? "km/h" : "m/s"}
          </span>
        </span>

        <span style={{ fontSize: "16px" }}>
          {weatherData ? currentTime : null}
        </span>
      </div>
    </>
  );
}
