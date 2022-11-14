import React, { useEffect, useState } from "react";
import "./App.css";
import SearchButton from "./SearchButton";
import MainWeatherTab from "./MainWeatherTab";
import SearchWindow from "./SearchWindow";
import notAvailable from "./icons/not-available.svg";
import WindStatus from "./WindStatus";
import UVIndex from "./UVIndex";
import OneDataTab from "./OneDataTab";

const actualKey = "0afe1fabd8754c45bd1204815221111";

const mainIcons = require.context("./icons", false, /\.svg$/);
const mainIconsPaths = mainIcons.keys();
const mainIconsSvg = mainIconsPaths.map((path) => mainIcons(path));

const waterDropIcon = mainIconsSvg.filter((path) => path.includes("water-drop-icon"))[0];
const visibilityIcon = mainIconsSvg.filter((path) => path.includes("visibility-icon"))[0];
const thermometerIcon = mainIconsSvg.filter((path) => path.includes("thermometer-icon"))[0];

console.log(waterDropIcon);
console.log(mainIconsSvg);

const weatherDayIcons = require.context("./icons/weather_day", true, /\.svg$/);
const weatherNightIcons = require.context("./icons/weather_night", true, /\.svg$/);
const weatherDayIconsPaths = weatherDayIcons.keys();
const weatherNightIconsPaths = weatherNightIcons.keys();
const weatherDaySVG = weatherDayIconsPaths.map((path) => weatherDayIcons(path));
const weatherNightSVG = weatherNightIconsPaths.map((path) => weatherNightIcons(path));

console.log(weatherDaySVG);
console.log(weatherNightSVG);

const allRegionsJson = require("./allRegions");

const url = {
  test: "https://jsonplaceholder.typicode.com/todos/1/posts",
  main: `https://api.weatherapi.com/v1/current.json?key=${actualKey}&q=`,
};

const fetchUrl = url.main;

export default function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [searchVisibility, setSearchVisibility] = useState(false);
  const [weatherIcon, setWeatherIcon] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [currentRegion, setCurrentRegion] = useState("");

  const {
    current: { humidity, vis_km, feelslike_c },
  } = weatherData ? weatherData : { current: { humidity: 0, vis_km: 0, feelslike_c: 0 } };

  const allRegions = JSON.parse(JSON.stringify(allRegionsJson));
  const allRegionsArr = [];
  for (let countryKey in allRegions) {
    allRegionsArr.push(allRegions[countryKey].map((region) => region + ", " + countryKey));
  }
  let allRegionsFlat = new Set(allRegionsArr.flat(1));
  allRegionsFlat = Array.from(allRegionsFlat);

  const filteredRegions =
    searchValue && searchValue.length >= 2
      ? allRegionsFlat.filter((region) => region.toLowerCase().startsWith(searchValue))
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

  console.log(`Current region: ${currentRegion}`);
  console.log("Search value:", searchValue);
  console.log("Filtered Regions:", filteredRegions);
  console.log(`weatherData: ${weatherData}`, weatherData);
  console.log(`Search state: ${searchVisibility}`);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
      setCurrentRegion(`${latitude},${longitude}`);
    });
  }, []);

  useEffect(() => {
    const fetchWeather = async () => {
      if (currentRegion) {
        const data = await fetch(`${fetchUrl}${currentRegion}`);

        const json = await data.json();
        setWeatherData(json);
      }
    };
    fetchWeather().catch((error) => console.log(error));
  }, [currentRegion]);

  useEffect(() => {
    if (weatherData) {
      const weatherCode = weatherData.current.condition.code; // https://www.weatherapi.com/docs/weather_conditions.json
      const isDay = weatherData.current.is_day;

      const weatherIcon = isDay
        ? weatherDaySVG.filter((svgName) => svgName.includes(weatherCode))
        : weatherNightSVG.filter((svgName) => svgName.includes(weatherCode));

      setWeatherIcon(weatherIcon[0] ? weatherIcon[0] : notAvailable);
      console.log(weatherIcon, "weatherCode:", weatherCode, "isDay:", isDay);
    }
  }, [weatherData]);

  return (
    <>
      <div className="top-section-container">
        {weatherData && (
          <MainWeatherTab
            className={"main-weather-tab"}
            buttonComponent={<SearchButton onClickFunc={getSearchVisibility} />}
            weatherData={weatherData}
            weatherIcon={weatherIcon}
          />
        )}
        <div className="todays-highlight-container">
          <div className="header-wrapper">
            <h4>Today's Highlight</h4>
          </div>
          <div className="item-container">
            <div className="diagram-item">
              <WindStatus weatherData={weatherData} />
            </div>

            <div style={{ position: "relative" }} className="diagram-item">
              <UVIndex weatherData={weatherData} />
            </div>

            <div className="diagram-item"></div>
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
      </div>
      {searchVisibility ? (
        <SearchWindow
          foundedCountriesList={filteredRegions}
          onChangeFunc={getSearchValue}
          onClickFunc={getSearchVisibility}
          onClickRegion={getRegionValue}
        />
      ) : null}
    </>
  );
}
