import { useState } from "react";
import SearchBar from "./components/SearchBar";
import WeatherDisplay from "./components/WeatherDisplay";
import ErrorMessage from "./components/ErrorMessage";
import "./App.css";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState("");

  const fetchWeather = async (city) => {
    setError("");
    try {
      const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
      );
      const data = await res.json();

      if (data.cod !== 200) {
        setError(data.message);
        setWeatherData(null);
      } else {
        setWeatherData(data);
      }
    } catch (err) {
      setError("Network error");
      setWeatherData(null);
    }
  };

  const getWeatherClass = () => {
    if (!weatherData) return "app";
    const main = weatherData.weather[0].main.toLowerCase();
    switch (main) {
      case "clear":
        return "app clear";
      case "clouds":
        return "app clouds";
      case "rain":
      case "drizzle":
        return "app rain";
      case "thunderstorm":
        return "app thunderstorm";
      case "snow":
        return "app snow";
      case "mist":
        return "app mist";
      default:
        return "app";
    }
  };

  return (
    <div className={getWeatherClass()}>
      <h1>Weather App</h1>
      <SearchBar onSearch={fetchWeather} />
      {error && <ErrorMessage message={error} />}
      {weatherData && <WeatherDisplay data={weatherData} />}
    </div>
  );
}

export default App;
