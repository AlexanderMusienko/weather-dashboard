import React, { useEffect, useState } from "react";
import "./App.css";
import notAvailable from "./icons/not-available.svg";

import SearchButton from "./components/SearchButton";
import MainWeatherTab from "./components/MainWeatherTab";
import SearchWindow from "./components/SearchWindow";
import WindStatus from "./components/WindStatus";
import UVIndex from "./components/UVIndex";
import OneDataTab from "./components/OneDataTab";
import AirQuality from "./components/AirQuality";
import WeatherForecast from "./components/WeatherForecast";
import TomorrowWeatherHighlight from "./components/TomorrowWeatherHighlight";

const mainIcons = require.context("./icons", false, /\.svg$/);
const mainIconsPaths = mainIcons.keys();
const mainIconsSvg = mainIconsPaths.map((path) => mainIcons(path));

const waterDropIcon = mainIconsSvg.filter((path) =>
  path.includes("water-drop-icon")
)[0];
const visibilityIcon = mainIconsSvg.filter((path) =>
  path.includes("visibility-icon")
)[0];
const thermometerIcon = mainIconsSvg.filter((path) =>
  path.includes("thermometer-icon")
)[0];

const weatherDayIcons = require.context("./icons/weather_day", true, /\.svg$/);
const weatherNightIcons = require.context("./icons/weather_night", true, /\.svg$/);
const weatherDayIconsPaths = weatherDayIcons.keys();
const weatherNightIconsPaths = weatherNightIcons.keys();
const weatherDaySVG = weatherDayIconsPaths.map((path) => weatherDayIcons(path));
const weatherNightSVG = weatherNightIconsPaths.map((path) =>
  weatherNightIcons(path)
);

const allRegionsJson = require("./allRegions");
const actualKey = "bdedcb8b532f41648fe125540232906";

const url = {
  test: "https://jsonplaceholder.typicode.com/todos/1/posts",
  main: `https://api.weatherapi.com/v1/current.json?`,
  astro: `https://api.weatherapi.com/v1/astronomy.json?`,
  forecast: `https://api.weatherapi.com/v1/forecast.json?`,
};

export default function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [searchVisibility, setSearchVisibility] = useState(false);
  const [weatherHighlightVisibility, setWeatherHighlightVisibility] = useState(true);
  const [weatherIcon, setWeatherIcon] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [currentRegion, setCurrentRegion] = useState("");

  const {
    current: { humidity, vis_km, feelslike_c },
  } = weatherData || { current: { humidity: 0, vis_km: 0, feelslike_c: 0 } };

  const allRegions = JSON.parse(JSON.stringify(allRegionsJson));
  const allRegionsArr = [];
  for (let countryKey in allRegions) {
    allRegionsArr.push(
      allRegions[countryKey].map((region) => region + ", " + countryKey)
    );
  }
  let allRegionsFlat = new Set(allRegionsArr.flat(1));
  allRegionsFlat = Array.from(allRegionsFlat);

  const filteredRegions =
    searchValue && searchValue.length >= 2
      ? allRegionsFlat.filter((region) =>
          region.toLowerCase().startsWith(searchValue)
        )
      : [];

  function getSearchVisibility() {
    const visible = searchVisibility ? false : true;
    setSearchVisibility(visible);
  }

  function getSearchValue(e) {
    const searchValue = e.target.value;
    setSearchValue(searchValue.toLowerCase());
  }

  function getRegionValue(e) {
    e.preventDefault(e);
    const region = e.target.value;
    setCurrentRegion(region);
    setTimeout(() => getSearchVisibility(), 300);
  }

  function changeHighlightVisibility(e) {
    e.target.scrollTop > 20
      ? setWeatherHighlightVisibility(false)
      : setWeatherHighlightVisibility(true);
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setCurrentRegion(`${latitude},${longitude}`);
      }
    );
  }, []);

  useEffect(() => {
    const currentDate = new Date().toLocaleDateString("fr-CA", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    });

    const fetchWeather = async () => {
      if (currentRegion) {
        const weatherData = await fetch(
          `${url.forecast}key=${actualKey}&q=${currentRegion}&days=1&aqi=yes`
        );
        const weatherJson = await weatherData.json();

        const astroData = await fetch(
          `${url.astro}key=${actualKey}&q=${currentRegion}&dt=${currentDate}`
        );
        const astroJson = await astroData.json();

        const resultJson = { ...weatherJson, ...astroJson };

        setWeatherData(resultJson);

        fetch(
          `${
            url.forecast
          }key=${actualKey}&q=${currentRegion}&days=8&dt=${new Date().setDate(
            currentDate + 1
          )}`
        )
          .then((response) => response.json())
          .then((data) => setForecastData(data))
          .catch((err) => console.log(err));
      }
    };
    fetchWeather().catch((error) => console.log(error));
  }, [currentRegion]);

  useEffect(() => {
    if (weatherData) {
      const weatherCode = weatherData.current.condition.code; // https://www.weatherapi.com/docs/weather_conditions.json
      const isDay = weatherData.current.is_day;

      const weatherIcon = isDay
        ? weatherDaySVG.filter((svgName) => svgName.includes(weatherCode))[0]
        : weatherNightSVG.filter((svgName) => svgName.includes(weatherCode))[0];

      setWeatherIcon(notAvailable && weatherIcon);
    }
  }, [weatherData]);

  return (
    <>
      <div className="page-container">
        <MainWeatherTab
          className={"main-weather-tab"}
          buttonComponent={<SearchButton onClickFunc={getSearchVisibility} />}
          weatherData={weatherData}
          weatherIcon={weatherIcon}
        />
        <div className="todays-highlight-container">
          <div className="header-wrapper">
            <h4>Today's Highlight</h4>
          </div>
          <div className="item-container" style={{ marginBottom: "15px" }}>
            <div className="diagram-item">
              <WindStatus weatherData={weatherData} />
            </div>

            <div style={{ position: "relative" }} className="diagram-item">
              <UVIndex weatherData={weatherData} />
            </div>

            <div className="diagram-item">
              <AirQuality weatherData={weatherData} />
            </div>
          </div>

          <div className="item-container">
            <OneDataTab
              containerClassName={"one-data-item"}
              header={"Humidity"}
              dataValue={humidity}
              unitValue={"%"}
              icon={waterDropIcon}
            />
            <OneDataTab
              containerClassName={"one-data-item"}
              header={"Visibility"}
              dataValue={vis_km}
              unitValue={"km"}
              icon={visibilityIcon}
            />
            <OneDataTab
              containerClassName={"one-data-item"}
              header={"Feels like"}
              dataValue={feelslike_c}
              unitValue={"°C"}
              icon={thermometerIcon}
            />
          </div>
        </div>
        <div className="forecast-container">
          {forecastData?.forecast?.forecastday.length > 3 && (
            <TomorrowWeatherHighlight
              forecastData={forecastData}
              weatherDaySVG={weatherDaySVG}
              isVisible={weatherHighlightVisibility}
            />
          )}
          <div className="forecast-wrapper" onScroll={changeHighlightVisibility}>
            <WeatherForecast
              forecastData={forecastData}
              weatherDaySVG={weatherDaySVG}
            />
          </div>
        </div>
        <div className="todays-highlight-container"></div>
      </div>
      {searchVisibility && (
        <SearchWindow
          foundedCountriesList={filteredRegions}
          onChangeFunc={getSearchValue}
          onClickFunc={getSearchVisibility}
          onClickRegion={getRegionValue}
        />
      )}
    </>
  );
}
