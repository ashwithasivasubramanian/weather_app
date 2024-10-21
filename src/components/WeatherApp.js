import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [location, setLocation] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState('');

  const apiKey = '797dd19ed01fd1f9d93f35e8f93493ff'; // Active OpenWeatherMap API key

  const fetchWeather = async () => {
    if (location.trim() === '') {
      setError('Please enter a location');
      return;
    }

    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`
      );

      setWeatherData(response.data);
      setError('');
    } catch (err) {
      console.error(err);
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('Location not found');
      }
      setWeatherData(null);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchWeather();
  };

  const styles = {
    app: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      fontFamily: 'Arial, sans-serif',
      background: 'linear-gradient(to bottom right, #a8e0ff, #ffb3b3)', // Changed background gradient
      color: '#333', // Slightly darker text color for contrast
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    input: {
      padding: '10px',
      fontSize: '1rem',
      borderRadius: '5px',
      border: 'none',
      marginBottom: '10px',
      width: '200px',
    },
    button: {
      padding: '10px 20px',
      fontSize: '1rem',
      backgroundColor: '#ff7e5f',
      border: 'none',
      borderRadius: '5px',
      color: '#fff',
      cursor: 'pointer',
    },
    error: {
      color: 'red',
      marginTop: '10px',
    },
    weatherInfo: {
      marginTop: '20px',
      backgroundColor: 'rgba(255, 255, 255, 0.3)',
      padding: '20px',
      borderRadius: '10px',
      textAlign: 'center',
      width: '250px',
    },
  };

  return (
    <div style={styles.app}>
      <h1>Weather Forecast</h1>
      <form onSubmit={handleSearch} style={styles.form}>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Enter location"
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Search</button>
      </form>

      {error && <p style={styles.error}>{error}</p>}

      {weatherData && (
        <div style={styles.weatherInfo}>
          <h2>{weatherData.name}</h2>
          <p>Temperature: {weatherData.main.temp}°C</p>
          <p>Weather: {weatherData.weather[0].description}</p>
          <p>Humidity: {weatherData.main.humidity}%</p>
          <p>Wind Speed: {weatherData.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
};

export default App;