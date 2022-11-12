import React from "react";
import { Count, RadialGauge, RadialGaugeOuterArc, RadialGaugeSeries } from "reaviz";

export default function UVIndex({ weatherData }) {
  const uvValue = weatherData ? weatherData.current.uv : 0;

  return (
    <>
      <h5>UV index</h5>
      <div style={{ height: "130px" }}>
        <RadialGauge
          data={[{ key: "UV index", data: uvValue }]}
          minValue={0}
          maxValue={13}
          height={230}
          series={
            <RadialGaugeSeries
              arcWidth={30}
              label={null}
              valueLabel={null}
              colorScheme={"#0083ff"}
              outerArc={<RadialGaugeOuterArc color={"#c4c4c430"} />}
            />
          }
          startAngle={-Math.PI / 2}
          endAngle={Math.PI / 2}
          className={"uv-index-gauge-container"}
        />
      </div>
      <div className={"uv-index-item"}>
        <Count to={uvValue} decimalPlaces={1} />
        <span style={{ fontSize: "12px" }}> UV</span>
      </div>
    </>
  );
}
