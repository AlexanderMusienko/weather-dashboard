import React from "react";
import {
  RadialGauge,
  RadialGaugeArc,
  RadialGaugeOuterArc,
  RadialGaugeSeries,
} from "reaviz";

export default function UVIndex(data) {
  return (
    <>
      <h5>UV index</h5>
      <RadialGauge
        data={[{ key: "Austin, TX", data: 6 }]}
        minValue={0}
        maxValue={13}
        series={
          <RadialGaugeSeries
            arcWidth={30}
            label={null}
            valueLabel={null}
            outerArc={<RadialGaugeOuterArc color={"#c4c4c430"} />}
          />
        }
        startAngle={-Math.PI / 2}
        endAngle={Math.PI / 2}
      />
    </>
  );
}
