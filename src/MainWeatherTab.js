import React from 'react'
import locationIcon from './icons/location.svg'
import calendarIcon from './icons/calendar.svg'

export default function MainWeatherTab(props) {

  return (
    <div className={props.className}>
      {props.buttonComponent}
      <img alt='weather' src={props.weatherIcon} style={{maxWidth: '128px'}}></img>
      <span style={{fontSize: '70px'}}>{props.temperature}<sup style={{fontSize: '36px', fontWeight: '600'}}>°C</sup></span>

      <div style={{display: 'flex', alignItems: 'center'}}>
        <img alt='weather' src={props.weatherConditionIcon} style={{maxWidth: '25px', marginRight: '5px'}}/>
        <span>{props.weatherCondition}</span>
      </div>

      <hr style={{marginBlock: '15px', color: '#ffffff50'}}/>
      <div style={{display: 'flex', alignItems: 'center', marginBottom: '15px'}}>
        <img alt='location' src={locationIcon} style={{width: '15px', marginRight: '10px', filter: 'opacity(0.8)'}}/>
        <span>{props.location}</span>
      </div>

      <div style={{display: 'flex', alignItems: 'center'}}>
        <img alt='calendar' src={calendarIcon} style={{width: '15px', marginRight: '10px', filter: 'opacity(0.8)'}}/>
        <span>{props.lastUpdateDate}</span>
      </div>
    </div>
  )
}
