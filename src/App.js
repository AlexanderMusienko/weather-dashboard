import React, { useEffect, useState } from "react";
import "./App.css";
import SearchButton from "./SearchButton";
import MainWeatherTab from "./MainWeatherTab";
import SearchWindow from "./SearchWindow";

const weatherIcons = require.context('./icons/weather', true, /\.svg$/)
const allWeatherIconsPaths = weatherIcons.keys()
const weatherSvgs = allWeatherIconsPaths.map( path => weatherIcons ( path ) )

console.log(weatherSvgs)

const allRegionsJson = require("./allRegions");

const url = {
  test: 'https://jsonplaceholder.typicode.com/todos/1/posts',
  main: 'https://api.weatherapi.com/v1/current.json?key=2e40d0c4e5034462948203411222410&q='
}

const fetchUrl = url.main;

export default function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [searchVisibility, setSearchVisibility] = useState(false);
  const [weatherIcon, setWeatherIcon] = useState('');
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

  function getSearchVisibility() {
    const visible = searchVisibility ? false : true;
    setSearchVisibility(visible);
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

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({coords:{
      latitude, longitude
    }}) => {
      setCurrentRegion(`${latitude},${longitude}`)
    })
  }, [])

  useEffect(() => {
    const fetchWeather = async () => {
      const data = await fetch(`${fetchUrl}${currentRegion}`)

      const json = await data.json()
      setWeatherData(json)
    }
    fetchWeather()
    .catch(error => console.log(error)) 
  }, [currentRegion])

  return (
    <>
      <div className="top-section-container">
        <MainWeatherTab
          className={"main-weather-tab"}
          buttonComponent={<SearchButton onClickFunc={getSearchVisibility} />}
          weatherIcon={ weatherData?.current ? weatherData.current.condition.icon.replace('64x64', '128x128') : ''}
          temperature={ weatherData?.current ? weatherData.current.temp_c : ''}
          weatherCondition={ weatherData?.current ? weatherData.current.condition.text : ''}  
          weatherConditionIcon={ weatherData?.current ? weatherData.current.condition.icon : ''}
          location={ weatherData?.current? weatherData.location.name + ", " + weatherData.location.country : ''}
          lastUpdateDate={ weatherData?.current ? weatherData.current.last_updated : ''}
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
    </>
  );
}
