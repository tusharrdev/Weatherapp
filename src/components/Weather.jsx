import React, { useEffect, useRef, useState } from 'react'
import './Weather.css'
import search_icon from '../assets/search.png'
import clear_icon from '../assets/clear.png'
import cloud_icon from '../assets/cloud.png'
import drizzle_icon from '../assets/drizzle.png'
import rain_icon from '../assets/rain.png'
import snow_icon from '../assets/snow.png'
import wind_icon from '../assets/wind.png'
import humidity_icon from '../assets/humidity.png'

const Weather = () => {

  const inputRef = useRef()
  const[weatherData, setWeatherData]= useState(false)

const allIcons = {
  "1000": clear_icon, // Sunny/Clear
  "1003": cloud_icon, // Partly Cloudy
  "1006": cloud_icon, // Cloudy
  "1009": cloud_icon, // Overcast
  "1063": rain_icon,  // Patchy rain
  "1150": drizzle_icon, // Light drizzle
  "1183": rain_icon,  // Light rain
  "1195": rain_icon,  // Heavy rain
  "1225": snow_icon,  // Heavy snow
  "1258": snow_icon,  // Heavy snow showers
  // Add more as needed
}


const search = async (city) => {
  if(city ===""){
    alert("Enter City Name")
    return
  }
  try {
    const url = `https://api.weatherapi.com/v1/current.json?key=${import.meta.env.VITE_APP_ID}&q=${city}`;
    const response = await fetch(url);
    const data = await response.json();
    if(!response.ok){
      alert(data.message);
      return;
    }
    console.log(data);

    const conditionCode = data.current.condition.code.toString();
    const icon = allIcons[conditionCode] || clear_icon;

    setWeatherData({
      humidity: data.current.humidity,
      windSpeed: data.current.wind_kph,
      temperature: Math.floor(data.current.temp_c),
      location: data.location.name,
      icon: icon
    });
  } catch (error) {
    setWeatherData(false);
    console.error("Failed to fetch weather data:", error);
    
  }
};


  useEffect(()=>{
    search("London")
  },[])

  return (
    <div className='weather'>
        <div className='search-bar'>
            <input ref={inputRef} type="text" placeholder='Search' />
            <img src={search_icon} alt="" onClick={()=>search(inputRef.current.value)}/>
        </div>
        {weatherData && <img src={weatherData.icon} alt="" className='weather-icon' />}
        <p className='temperature'>{weatherData.temperature}℃</p>
        <p className='location'>{weatherData.location}</p>
        <div className='weather-data'>
          <div className='col'>
            <img src={humidity_icon} alt="" />
            <div>
              <p>{weatherData.humidity}%</p>
              <span>Humidity</span>
            </div>
          </div>
          <div className='col'>
            <img src={wind_icon} alt="" />
            <div>
              <p>{weatherData.windSpeed} Km/h</p>
              <span>Wind Speed</span>
            </div>
          </div>

        </div>
    </div>
  )
}

export default Weather