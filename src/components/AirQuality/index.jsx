import React from "react";
import {
  BarList,
  BarListSeries,
  BubbleChart,
  RadialAreaChart,
  RadialAreaSeries,
  RadialAxis,
  FunnelChart,
  BarChart,
  PieChart,
  PieArcSeries,
  FunnelArc,
  TreeMap,
  RadialGauge,
  BarSparklineChart,
  BarSeries,
  Bar,
  BarLabel,
  LinearYAxis,
  LinearYAxisTickSeries,
  LinearXAxisTickSeries,
  LinearXAxis,
  GridlineSeries,
  Gridline,
  LineChart,
  Meter,
  LinearGauge,
  LinearGaugeSeries,
  LinearGaugeBar,
} from "reaviz";
import { resolveAirConditionLabel } from "@utils/resolveAirConditionLabel";
import s from "./style.module.css";

const colorScheme = (data) => {
  switch (data.value) {
    case 1:
      return "#acea6e";
    case 2:
      return "#fbff87";
    case 3:
      return "#ffd587";
    case 4:
      return "#ff9987";
    case 5:
      return "#d072fc";
    case 6:
      return "#d10000";
  }
};

const noData = {
  current: {
    air_quality: {
      co: 0,
      no2: 0,
      "us-epa-index": 0,
    },
  },
};

export default function AirQuality({ weatherData }) {
  const {
    current: {
      air_quality: { co, "us-epa-index": usEpaIndex, no2, o3, so2 },
    },
  } = weatherData || noData;

  // const barListData = [
  //   { key: "CO", data: co },
  //   { key: `O3`, data: o3 },
  //   { key: `NO2`, data: no2 },
  //   { key: `SO2`, data: so2 },
  // ];

  const airCondition = resolveAirConditionLabel(usEpaIndex);

  return (
    <>
      <h5>Air Quality</h5>
      <div className={s.gaugeWrapper}>
        <LinearGauge
          height={55}
          width={"90%"}
          maxValue={6}
          data={{ key: `US EPA Index`, data: usEpaIndex }}
          series={
            <LinearGaugeSeries
              colorScheme={(data) => {
                return `hsl(${220 + data.value * 12},90%,50%)`;
              }}
            />
          }
        />
      </div>

      <div>
        <span className={s.acLabelContainer}>{airCondition}</span>
      </div>
    </>
  );
}
