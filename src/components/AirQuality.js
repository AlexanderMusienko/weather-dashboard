import React from 'react'
import { BarList } from "reaviz";

export default function AirQuality({ weatherData }) {
  const noData = {
    current: {
      air_quality: {
        co: 0,
        no2: 0,
        "us-epa-index": 0,
      },
    },
  };

  const {
    current: {
      air_quality: { co, "us-epa-index": usEpaIndex, no2, o3, so2 },
    },
  } = weatherData || noData;

  console.log(usEpaIndex);

  let airCondition;

  switch (usEpaIndex) {
    case 1:
      airCondition = "Good";
      break;

    case 2:
      airCondition = "Moderate";
      break;

    case 3:
      airCondition = "Unhealthy for sensitive group";
      break;

    case 4:
      airCondition = "Unhealthy";
      break;

    case 5:
      airCondition = "Very Unhealty";
      break;

    case 6:
      airCondition = "Hazardous";
      break;

    default:
      airCondition = "None";
      break;
  }

  return (
    <>
      <h5>Air Quality</h5>
      <BarList
        data={[
          { key: "CO", data: co },
          { key: `NO2`, data: no2 },
        ]}
      />
      <div style={{ display: "flex", justifyContent: "end" }}>
        <span>{airCondition}</span>
      </div>
    </>
  );
}
