import React, { useState } from "react";
import s from "./style.module.css";
import { resolveWeatherIcon } from "../../utils/resolveWeatherIcon";
import { HorScrollHandler } from "../../utils/HorScrollHandler";
import { motion, AnimatePresence } from "framer-motion";

const noData = {
  location: { localtime: 0 },
  forecast: {
    forecastday: [
      {
        hour: [],
      },
    ],
  },
};

export default function DayForecast({ weatherData, onlyFutureHours = false }) {
  const {
    location: { localtime },
    forecast: {
      forecastday: [{ hour }],
    },
  } = weatherData ? weatherData : noData;

  const filteredHours = hour.filter(({ time }) => {
    const currentHour = new Date(localtime).getHours();
    const itemHour = new Date(time).getHours();

    return currentHour <= itemHour;
  });

  const hoursCards = (onlyFutureHours ? filteredHours : hour).map(
    ({ temp_c, wind_kph, time, is_day, condition: { code } }) => {
      const timeForPrint = new Date(time).toLocaleTimeString(undefined, {
        hour: "numeric",
        minute: "numeric",
      });

      const currentHour = new Date(localtime).getHours();
      const itemHour = new Date(time).getHours();

      const icon = resolveWeatherIcon(code, is_day);

      return (
        <motion.div
        initial={{ opacity: 0, transform: "scale(0.8)" }}
        animate={{ opacity: 1, transform: "scale(1)" }}
        exit={{ opacity: 0 }}
          className={s.cardContainer}
          key={time + " forecastCard"}
        >
          <span className={s.timeText}>
            {currentHour === itemHour ? "Now" : timeForPrint}
          </span>
          <div className={s.imageWrapper}>
            <img src={icon} />
          </div>
          <span className={s.tempText}>
            {Math.round(temp_c)} <sup className={s.tempUnit}>°C</sup>
          </span>
          <span className={s.windInfo}>{wind_kph} km/h</span>
        </motion.div>
      );
    }
  );

  return (
    <AnimatePresence>
      <div className={s.dayWeatherWrapper}>
        <div onWheel={HorScrollHandler} className={s.dayWeatherContainer}>
          {hoursCards}
        </div>
      </div>
    </AnimatePresence>
  );
}
