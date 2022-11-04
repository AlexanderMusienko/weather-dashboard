import React, { useEffect, useState } from "react";
import "./App.css";
import SearchButton from "./SearchButton";
import MainWeatherTab from "./MainWeatherTab";
import SearchWindow from "./SearchWindow";
import notAvailable from './icons/not-available.svg';

const actualKey = "2e40d0c4e5034462948203411222410";

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
  console.log(searchValue);
  console.log(filteredRegions);
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
      const weatherCode = weatherData.current.condition.code;  // https://www.weatherapi.com/docs/weather_conditions.json 
      const isDay = weatherData.current.is_day;

      const weatherIcon = isDay
        ? weatherDaySVG.filter((svgName) => svgName.startsWith(weatherCode))
        : weatherNightSVG.filter((svgName) => svgName.includes(weatherCode));

      setWeatherIcon(weatherIcon[0] ? weatherIcon[0] : notAvailable)
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
