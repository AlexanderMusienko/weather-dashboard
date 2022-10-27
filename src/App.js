import React, { useState } from 'react'
import './App.css'
import SearchButton from './SearchButton'
import MainWeatherTab from './MainWeatherTab'
import GetInfoButton from './GetInfoButton'
import SearchWindow from './SearchWindow'

const allRegionsJson = require('./allRegions');

const {location, current} = {
    "location": {
      "name": "London",
      "region": "City of London, Greater London",
      "country": "United Kingdom",
      "lat": 51.52,
      "lon": -0.11,
      "tz_id": "Europe/London",
      "localtime_epoch": 1613896955,
      "localtime": "2021-02-21 8:42"
    },
    "current": {
      "last_updated_epoch": 1613896210,
      "last_updated": "2021-02-21 08:30",
      "temp_c": 11,
      "temp_f": 51.8,
      "is_day": 1,
      "condition": {
        "text": "Partly cloudy",
        "icon": "//cdn.weatherapi.com/weather/128x128/day/116.png",
        "code": 1003
      },
      "wind_mph": 3.8,
      "wind_kph": 6.1,
      "wind_degree": 220,
      "wind_dir": "SW",
      "pressure_mb": 1009,
      "pressure_in": 30.3,
      "precip_mm": 0.1,
      "precip_in": 0,
      "humidity": 82,
      "cloud": 75,
      "feelslike_c": 9.5,
      "feelslike_f": 49.2,
      "vis_km": 10,
      "vis_miles": 6,
      "uv": 1,
      "gust_mph": 10.5,
      "gust_kph": 16.9,
      "air_quality": {
        "co": 230.3,
        "no2": 13.5,
        "o3": 54.3,
        "so2": 7.9,
        "pm2_5": 8.6,
        "pm10": 11.3,
        "us-epa-index": 1,
        "gb-defra-index": 1
      }
    }
  }

  console.log(location, current)

export default function App() {

  const [data, setData] = useState()
  const [searchVisibility, setSearchVisibility] = useState(false);
  const [checkboxValue, setCheckboxValue] = useState(false);

  const allRegions = JSON.parse(JSON.stringify(allRegionsJson));
  const allCountries = Object.keys(allRegions);

  function getSearchVisibility(e) {
    e.stopPropagation()
    console.log(e.target);

    const visible = searchVisibility ? false : true;
    setSearchVisibility(visible);
  }

  function getCheckboxValue(e) {
    const value = e.target.checked;
    setCheckboxValue(value);
  }

  function getWeatherData(e) {
    e.preventDefault();
    const data = checkboxValue ? 1 : 0;
    setData(data);
  }
  
  console.log(`Search state: ${searchVisibility}`);
  console.log(allCountries);
  console.log(data);
  console.log(checkboxValue);

  return (
    <>
      <div className='top-section-container'>
          <MainWeatherTab 
          className={'main-weather-tab'} 
          buttonComponent={<SearchButton onClickFunc={getSearchVisibility}/>} 
          weatherIcon={current.condition.icon}
          temperature={current.temp_c}
          weatherCondition={current.condition.text}
          weatherConditionIcon={current.condition.icon}
          location={location.name + ', ' + location.country}
          lastUpdateDate={current.last_updated}
          />
      </div>
      {searchVisibility ? <SearchWindow onClickFunc={getSearchVisibility}/> : null}
      <GetInfoButton onClickCheckboxFunc={getCheckboxValue} onClickButtonFunc={getWeatherData}/>
    </>
  )
}
