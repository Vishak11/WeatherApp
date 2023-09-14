import React, { useState } from 'react'
import './App.css'
import search_icon from './Assets/search.png'
import clear_icon from './Assets/clear.png'
import cloud_icon from './Assets/cloud.png'
import drizzle_icon from './Assets/drizzle.png'
import humidity_icon from './Assets/humidity.png'
import rain_icon from './Assets/rain.png'
import snow_icon from './Assets/snow.png'
import wind_icon from './Assets/wind.png'

function WeatherApp() {
    let api_key = "f3ab932c308e9545f739fe3a91f5fa9e"
    const [wicon, setWicon] = useState(cloud_icon)
    const [placeholder, setPlaceholder] = useState('Search');
    const search = async () => {
        const element = document.getElementsByClassName("cityInput")

        if (element[0].value === "") {
            alert("enter a location")
        }
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`;

        let response = await fetch(url)
        if (response.ok)
         {
            let data = await response.json()
            console.log(data)
            const humidity = document.getElementsByClassName("humidity-percent")
            const wind = document.getElementsByClassName("wind-speed")
            const temp = document.getElementsByClassName("weather-temp")
            const location = document.getElementsByClassName("weather-location")
            humidity[0].innerHTML = data.main.humidity + " %";
            wind[0].innerHTML = Math.floor(data.wind.speed) + " km/h";
            temp[0].innerHTML = Math.floor(data.main.temp) + "°C";
            location[0].innerHTML = data.name;
            if (data.weather[0].icon === "01d" || data.weather[0].icon === "01n") {
                setWicon(clear_icon)
            }
            else if (data.weather[0].icon === "02d" || data.weather[0].icon === "02n") {
                setWicon(cloud_icon)
            }

            else if (data.weather[0].icon === "03d" || data.weather[0].icon === "03n") {
                setWicon(drizzle_icon)
            }
            else if (data.weather[0].icon === "04d" || data.weather[0].icon === "04n") {
                setWicon(drizzle_icon)
            }
            else if (data.weather[0].icon === "09d" || data.weather[0].icon === "09n") {
                setWicon(rain_icon)
            }
            else if (data.weather[0].icon === "010d" || data.weather[0].icon === "010n") {
                setWicon(rain_icon)
            }
            else if (data.weather[0].icon === "013d" || data.weather[0].icon === "013n") {
                setWicon(snow_icon)
            }
            else {
                setWicon(clear_icon)
            }

        }
        else{
            alert("data not available")
            setPlaceholder("Error fetching data");
        }
    }


    return (
        <div className='container'>
            <div className='top-bar'>
                <input type='text' className='cityInput'  placeholder={placeholder}
                    onChange={() => setPlaceholder('Search')} />
                <div className="search-icon" onClick={search}>
                    <img src={search_icon} alt='' />
                </div>

            </div>

            <div className="weather-image">
                <img src={wicon} alt='' />
            </div>
            <div className='weather-temp'>24°C</div>
            <div className="weather-location">Kannur</div>
            <div className='data-container'>
                <div className='elements'>
                    <img src={humidity_icon} alt='' className='icon' />
                    <div className='data'>
                        <div className="humidity-percent">64%</div>
                        <div className="text">Humidity</div>

                    </div>
                </div>

                <div className='elements'>
                    <img src={wind_icon} alt='' className='icon' />
                    <div className='data'>
                        <div className="wind-speed">14km/h</div>
                        <div className="text">Wind</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WeatherApp