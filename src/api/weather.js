const API_BASE = 'https://api.openweathermap.org/data/2.5';

export async function fetchWeatherByCity(city, units = 'metric') {
  const key = import.meta.env.VITE_OPENWEATHER_API_KEY;
  if (!key) throw new Error('Missing OpenWeather API key');

  const url = `${API_BASE}/weather?q=${encodeURIComponent(city)}&appid=${key}&units=${units}`;
  const res = await fetch(url);
  const data = await res.json();

  if (!res.ok) throw new Error(data?.message || 'Failed to fetch weather');
  return data;
}

export async function fetchWeatherByCoords(lat, lon, units = 'metric') {
  const key = import.meta.env.VITE_OPENWEATHER_API_KEY;
  if (!key) throw new Error('Missing OpenWeather API key');

  const url = `${API_BASE}/weather?lat=${lat}&lon=${lon}&appid=${key}&units=${units}`;
  const res = await fetch(url);
  const data = await res.json();

  if (!res.ok) throw new Error(data?.message || 'Failed to fetch weather');
  return data;
}