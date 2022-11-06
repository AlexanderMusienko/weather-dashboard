import React from "react";
import { RadialGauge } from "reaviz";

export default function UVIndex(data) {
  return (
    <>
      <h5>UV index</h5>
      <RadialGauge
        data={[{ key: "Austin, TX", data: 24 }]}
        width={200}
        height={200}
        startAngle={-Math.PI / 2}
        endAngle={Math.PI / 2}
      />
    </>
  );
}
