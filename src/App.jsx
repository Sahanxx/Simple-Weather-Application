import { useState } from 'react';
import SearchBar from './components/SearchBar.jsx';
import WeatherCard from './components/WeatherCard.jsx';
import { fetchWeatherByCity, fetchWeatherByCoords } from './api/weather.js';
import ThemeToggle from "./components/ThemeToggle.jsx";

function App() {
  const [units, setUnits] = useState('metric');
  const [weather, setWeather] = useState(null);
  const [lastCity, setLastCity] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const searchCity = async (city) => {
    setLoading(true);
    setError('');
    try {
      const data = await fetchWeatherByCity(city, units);
      setWeather(data);
      setLastCity(city);
    } catch (e) {
      setError(e.message || 'Something went wrong');
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  const useMyLocation = () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      return;
    }
    setLoading(true);
    setError('');
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const data = await fetchWeatherByCoords(
            pos.coords.latitude,
            pos.coords.longitude,
            units
          );
          setWeather(data);
          setLastCity(data.name);
        } catch (e) {
          setError(e.message || 'Failed to fetch weather');
          setWeather(null);
        } finally {
          setLoading(false);
        }
      },
      (err) => {
        setError(err.message || 'Unable to get your location');
        setLoading(false);
      }
    );
  };

  const toggleUnits = async () => {
    const newUnits = units === 'metric' ? 'imperial' : 'metric';
    setUnits(newUnits);

    if (weather?.name) {
      setLoading(true);
      setError('');
      try {
        const refreshed = await fetchWeatherByCity(weather.name, newUnits);
        setWeather(refreshed);
      } catch (e) {
        setError(e.message || 'Could not switch units');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 transition-colors duration-300
                  dark:bg-slate-900 dark:text-slate-100">
      <div className="mx-auto max-w-3xl p-6">
        <h1 className="mb-4 text-3xl font-bold">Weather</h1>

        <div className="mb-4 flex flex-wrap items-center gap-2">
          <SearchBar onSearch={searchCity} initialValue={lastCity} />
          <button
            onClick={useMyLocation}
            className="rounded-lg bg-slate-200 px-3 py-2 text-slate-900 hover:bg-slate-300
                     dark:bg-slate-700 dark:text-slate-100 dark:hover:bg-slate-600"
          >
            Use my location
          </button>
          <button
            onClick={toggleUnits}
            className="rounded-lg bg-slate-200 px-3 py-2 text-slate-900 hover:bg-slate-300
                     dark:bg-slate-700 dark:text-slate-100 dark:hover:bg-slate-600"
          >
            Units: {units === 'metric' ? '°C' : '°F'}
          </button>

          {/* New */}
          <ThemeToggle />
        </div>

        {loading && <p className="text-slate-500">Loading...</p>}
        {error && <p className="text-red-600">{error}</p>}
        {weather && !loading && <WeatherCard data={weather} units={units} />}
      </div>
    </div>
  );
}

export default App;