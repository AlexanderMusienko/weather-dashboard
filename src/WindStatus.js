import React from "react";
import {
  BarChart,
  BarSeries,
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

export default function WindStatus({ className, weatherData }) {
  const noData = {
    current: {
      last_updated: null,
      wind_kph: null,
    },
  };

  const {
    current: { last_updated, wind_kph },
  } = weatherData ? weatherData : noData;

  const currentTime = new Date(last_updated).toLocaleTimeString([], {timeStyle: 'short'})

  console.log("Current time:", currentTime);

  return (
    <>
      <h5 style={{ marginBottom: "35px" }}>Wind status</h5>

      <LineChart
        containerClassName="wind-line-chart-container"
        data={data}
        width={200}
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
        data={data}
        width={200}
        height={25}
        series={<BarSeries padding={0.6} colorScheme={"#757575"} />}
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
          alignItems: "end",
        }}
      >
        <div>
          <span style={{ fontSize: "32px" }}>{wind_kph}</span>
          <span style={{ fontSize: "12px" }}>km/h</span>
        </div>

        <span style={{ fontSize: "16px" }}>
          {weatherData ? currentTime : null}
        </span>
      </div>
    </>
  );
}
