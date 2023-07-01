import notAvailable from "@icons/not-available.svg";

export const resolveWeatherIcon = (weatherCode, isDay = true) => {
  const weatherDayIcons = require.context("@icons/weather_day", true, /\.svg$/);
  const weatherNightIcons = require.context("@icons/weather_night", true, /\.svg$/);
  const weatherDayIconsPaths = weatherDayIcons.keys();
  const weatherNightIconsPaths = weatherNightIcons.keys();
  const weatherDaySVG = weatherDayIconsPaths.map((path) => weatherDayIcons(path));
  const weatherNightSVG = weatherNightIconsPaths.map((path) =>
    weatherNightIcons(path)
  );

  const weatherIcon = isDay
    ? weatherDaySVG.find((el) => el.includes(weatherCode))
    : weatherNightSVG.find((el) => el.includes(weatherCode));

  return weatherIcon ? weatherIcon : notAvailable;
};
