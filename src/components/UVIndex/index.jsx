import React from "react";
import { Count, RadialGauge, RadialGaugeArc, RadialGaugeSeries } from "reaviz";
import s from "./style.module.css";

export default function UVIndex({ weatherData }) {
  const uvValue = weatherData ? weatherData.current.uv : 0;

  return (
    <>
      <h5>UV Index</h5>
      <div style={{ height: "130px" }}>
        <RadialGauge
          data={[{ key: "UV index", data: uvValue }]}
          minValue={0}
          maxValue={13}
          height={205}
          startAngle={-Math.PI / 2}
          endAngle={Math.PI / 2}
          className={s.uvIndexGaugeContainer}
          series={
            <RadialGaugeSeries
              arcWidth={30}
              label={null}
              valueLabel={null}
              colorScheme={(data) => {
                return `hsl(${220 + data.data * 10},90%,50%)`;
              }} // hsl(220,50%,50%)
              outerArc={<RadialGaugeArc disabled={true} color={"#c4c4c430"} />}
            />
          }
        />
      </div>
      <div className={s.uvIndexItem}>
        <Count to={uvValue} decimalPlaces={1} />
        <span style={{ fontSize: "12px" }}> UV</span>
      </div>
    </>
  );
}
