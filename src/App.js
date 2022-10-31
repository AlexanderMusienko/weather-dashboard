import React, { useEffect, useState } from "react";
import "./App.css";
import SearchButton from "./SearchButton";
import MainWeatherTab from "./MainWeatherTab";
import GetInfoButton from "./GetInfoButton";
import SearchWindow from "./SearchWindow";

const allRegionsJson = require("./allRegions");

export default function App() {
  const [weatherData, setWeatherData] = useState();
  const [searchVisibility, setSearchVisibility] = useState(false);
  const [checkboxValue, setCheckboxValue] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [currentRegion, setCurrentRegion] = useState("");

  const allRegions = JSON.parse(JSON.stringify(allRegionsJson));
  const allRegionsArr = []
  for (let countryKey in allRegions) {
    allRegionsArr.push(allRegions[countryKey].map((region) => region + ', ' + countryKey))
  };
  let allRegionsFlat = new Set(allRegionsArr.flat(1));
  allRegionsFlat = Array.from(allRegionsFlat);

  const filteredRegions =
    searchValue && searchValue.length >= 2
      ? allRegionsFlat.filter((region) => region.toLowerCase().startsWith(searchValue))
      : [];

  async function fetchWeatherData(q) {

    const weatherData = await fetch(`https://api.weatherapi.com/v1/current.json?key=2e40d0c4e5034462948203411222410&q=${q}`)

    return weatherData.json()
  }   

  function getSearchVisibility() {
    const visible = searchVisibility ? false : true;
    setSearchVisibility(visible);
  }

  function getCheckboxValue(e) {
    const value = e.target.checked;
    setCheckboxValue(value);
  }

  function getWeatherData(e) {
    e.preventDefault();

    const data = checkboxValue ? fetchWeatherData(currentRegion).then((data) => setWeatherData(data)) : 0;
    setWeatherData(data);
  }

  function getSearchValue(e) {
    const searchValue = e.target.value;
    setSearchValue(searchValue.toLowerCase());
  }

  function getRegionValue(e) {
    e.preventDefault(e)
    const region = e.target.value;
    setCurrentRegion(region);
    setTimeout(() => getSearchVisibility(), 300);
  }

  console.log(`Current region: ${currentRegion}`);
  console.log(searchValue);
  console.log(filteredRegions);
  console.log(`weatherData: ${weatherData}`, weatherData)
  console.log(`Search state: ${searchVisibility}`);
  console.log(allRegionsFlat);
  console.log(checkboxValue);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({coords:{
      latitude, longitude
    }}) => {
      setCurrentRegion(`${latitude},${longitude}`)
    })
  }, [])

  return (
    <>
      <div className="top-section-container">
        <MainWeatherTab
          className={"main-weather-tab"}
          buttonComponent={<SearchButton onClickFunc={getSearchVisibility} />}
          weatherIcon={current.condition.icon}
          temperature={current.temp_c}
          weatherCondition={current.condition.text}
          weatherConditionIcon={current.condition.icon}
          location={location.name + ", " + location.country}
          lastUpdateDate={current.last_updated}
        />
      </div>
      {searchVisibility ? (
        <SearchWindow
          foundedCountriesList={filteredRegions}
          onChangeFunc={getSearchValue}
          onClickFunc={getSearchVisibility}
          onClickRegion={getRegionValue}
        />
      ) : null}
      <GetInfoButton onClickCheckboxFunc={getCheckboxValue} onClickButtonFunc={getWeatherData} />
    </>
  );
}
