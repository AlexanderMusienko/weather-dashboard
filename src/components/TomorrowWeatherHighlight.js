import { AnimatePresence, motion } from "framer-motion";
import React from "react";

export default function TomorrowWeatherHighlight({ forecastData, weatherDaySVG, isVisible }) {
  const noData = {
    forecast: {
      forecastday: [
        {
          date: "2022-11-12",
          day: {
            maxtemp_c: 30,
            mintemp_c: -20,
            avgtemp_c: 1.8,
            condition: { code: 1000 },
          },
        },
        {
          date: "2022-11-12",
          day: {
            maxtemp_c: 30,
            mintemp_c: 30,
            avgtemp_c: 1.8,
            condition: { code: 1000 },
          },
        },
        {
          date: "2022-11-12",
          day: {
            maxtemp_c: 30,
            mintemp_c: 30,
            avgtemp_c: 1.8,
            condition: { code: 1000 },
          },
        },
      ],
    },
  };

  const {
    forecast: { forecastday },
  } = forecastData || noData;

  const {
    date,
    day: {
      maxtemp_c, // add this data to chart
      mintemp_c, // add this data to chart
      avgtemp_c, // add this data to chart
      condition: { code, text },
    },
  } = forecastday[1]; // this array key contains tomorrow day object

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, height: 0, padding: 0 }}
          style={{
            overflow: 'clip',
            display: "flex",
            position: "sticky",
            bottom: "0px",
            alignItems: "center",
            padding: "10px",
            borderRadius: "25px",
            boxShadow: "0px 0px 45px 0px #000000",
            backgroundImage:
              "linear-gradient(90deg, rgba(25,27,31,1) 0%, rgba(42,42,42,1) 10%, rgba(25,27,31,1) 40%)",
          }}
        >
          <img
            style={{ width: "75px", marginRight: "10px" }}
            src={weatherDaySVG.filter((iconPath) => iconPath.includes(code))[0]}
          />
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "baseline" }}>
            <span style={{ fontSize: "12px" }}>Tomorrow</span>
            <span style={{ fontSize: "25px" }}>{avgtemp_c}°</span>
            <span style={{ fontSize: "12px" }}>{text}</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
