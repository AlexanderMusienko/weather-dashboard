import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import s from "./style.module.css";

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

export default function TomorrowWeatherHighlight({
  forecastData,
  weatherDaySVG,
  isVisible,
}) {
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
      maxwind_kph,
    },
  } = forecastday[1]; // this array key contains tomorrow day object

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, height: 0, padding: 0 }}
          className={s.highlightContainer}
        >
          <div className={s.mainWeatherContainer}>
            <img
              className={s.weatherIcon}
              src={weatherDaySVG.filter((iconPath) => iconPath.includes(code))[0]}
            />
            <div className={s.textContainer}>
              <span style={{ fontSize: "12px" }}>Tomorrow</span>
              <span style={{ fontSize: "25px" }}>{avgtemp_c}°</span>
              <span style={{ fontSize: "12px" }}>{text}</span>
            </div>
          </div>
          <div className={s.extraWeatherContainer}>
            <span className={s.extraWeatherLabel}>Wind speed</span>
            <span>{maxwind_kph} km/h</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
