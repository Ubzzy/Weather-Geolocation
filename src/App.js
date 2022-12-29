import './App.css';
import { useState, useEffect } from 'react';
import Map from './map'
import env from "react-dotenv";

function App() {
  const [city, setCity] = useState('');

  function drawWeather(d) {
    console.log(d)
    var celcius = Math.round(parseFloat(d.main.temp) - 273.15);
    var iconID = d.weather[0].icon;

    document.getElementById('description').innerHTML = d.weather[0].description;
    document.getElementById('temp').innerHTML = celcius + '&deg;';
    document.getElementById('location').innerHTML = d.name;
    document.getElementById('icon').src = 'http://openweathermap.org/img/wn/' + iconID + '@2x.png';

  }

  const getWeather = () => {
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + env.WEATHER_API)
      .then(function (resp) { return resp.json() })
      .then(function (data) {
        drawWeather(data);
        console.log(data);
      })
      .catch(e => {
        console.log(e)
      })
  }

  //get weather details based on geolocation
  function geoLocation() {
    console.log("weather api: " +  + env.WEATHER_API)
    navigator.geolocation.getCurrentPosition(geoWeatherInfo);

    function geoWeatherInfo(position) {

      fetch('https://api.openweathermap.org/data/2.5/weather?lat=' + position.coords.latitude + '&lon=' + position.coords.longitude + '&appid=' + env.WEATHER_API)
        .then(function (resp) { return resp.json() })
        .then(function (data) {
          drawWeather(data);
          console.log(data);
        })
        .catch(function () {
          //catch errors
        });
    }
  }

  useEffect(() => {
    geoLocation()
  }, []);


  const handleChange = (event) => {
    setCity(event.target.value);
  }
  return (
    <>
      <header>
        <h1 className="header">Weather</h1>
      </header>
      <div id="inputArea">
        <input type="text" placeholder="City Location" value={city} onChange={handleChange} />
        <button onClick={getWeather}>Get Weather Info</button>
      </div>
      <div id="userWeatherArea">
        <button id="userWeather" onClick={geoLocation}>Weather For Your Location</button>
      </div>
      <main>
        <div id="weather">
          <div><img src="" id="icon" alt='' /></div>
          <div id="description"></div>
          <h1 id="temp"></h1>
          <div id="location"></div>

        </div>
      </main>
      <div>
        <h1 className="header">Your Location</h1>
      </div>
      <div id="mapArea">
        <Map />
      </div>

    </>
  );
}

export default App;
