import React, { useState } from 'react';
import cloud from "../images/Clouds.png";
import clear from "../images/Clear.png";
import rain from "../images/Rain.png";
import mist from "../images/mist.png";
import err from "../images/error.png";

const Weather = () => {
  const [search, setSearch] = useState(""); // City search input
  const [data, setData] = useState(null); // Weather data
  const [error, setError] = useState(""); // Error message

  const API_KEY = "6d83156e4e40ca97d0c6924b832fe00c"; // OpenWeatherMap API key
  const API_URL = "https://api.openweathermap.org/data/2.5/weather"; // Base API URL

  // Handle input changes in the search bar
  const handleInput = (event) => {
    setSearch(event.target.value);
  };

  // Fetch weather data based on the city name
  const fetchWeather = async () => {
    if (!search) {
      setError("Please Enter a City Name");
      return;
    }

    try {
      const response = await fetch(`${API_URL}?q=${search}&appid=${API_KEY}&units=metric`);
      const jsonData = await response.json();

      if (jsonData.cod === "404") {
        setError("City not found. Please enter a valid city name.");
        setData(null);
      } else {
        setData(jsonData);
        setError(""); // Clear error if data is valid
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
      setData(null);
    }
    
    setSearch(""); // Clear search input
  };

  // Get appropriate weather icon based on weather condition
  const getWeatherIcon = (condition) => {
    switch (condition) {
      case "Clouds":
        return cloud;
      case "Clear":
        return clear;
      case "Rain":
        return rain;
      case "Mist":
      case "Haze":
        return mist;
      default:
        return null;
    }
  };

  return (
    <div className="container">
      {/* Search Input */}
      <div className="inputs">
        <input
          type="text"
          placeholder="Search City"
          value={search}
          onChange={handleInput}
        />
        <button onClick={fetchWeather}>
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
      </div>

      {/* Error Display */}
      {error && (
        <div className="errorPage">
          <h2>Oops!</h2>
          <p>{error}</p>
          <img src={err} alt="Error" />
        </div>
      )}

      {/* Weather Data Display */}
      {data && data.weather && !error && (
        <div className="weathers">
          <h2 className="cityName">{data.name}</h2>
          {/* Weather condition icon */}
          <img src={getWeatherIcon(data.weather[0].main)} alt={data.weather[0].main} />
          
          {/* Display temperature */}
          <h2 className="temperature">{Math.trunc(data.main.temp)}°C</h2>
          <p className="climate">{data.weather[0].description}</p>

          {/* Display other weather info */}
          <p className="humidity">Humidity: {data.main.humidity}%</p>
          <p className="wind">Wind: {data.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
};

export default Weather;
