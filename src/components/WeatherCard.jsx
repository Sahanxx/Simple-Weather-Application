function WeatherCard({ data, units }) {
  if (!data) return null;

  const { name, sys, weather, main, wind } = data;
  const w = weather?.[0] || { description: '', icon: '01d' };
  const icon = `https://openweathermap.org/img/wn/${w.icon}@2x.png`;
  const tempUnit = units === 'metric' ? '°C' : '°F';
  const windUnit = units === 'metric' ? 'm/s' : 'mph';

  return (
    <div className="rounded-xl bg-white p-4 shadow-sm md:p-6 dark:bg-slate-800">
      <h2 className="text-xl font-semibold">
        {name}{sys?.country ? `, ${sys.country}` : ''}
      </h2>

      <div className="mt-2 flex items-center gap-3">
        <img src={icon} alt={w.description} className="h-16 w-16" />
        <div className="text-5xl font-bold">
          {Math.round(main.temp)}{tempUnit}
        </div>
      </div>

      <div className="mt-1 capitalize text-slate-600 dark:text-slate-300">
        {w.description}
      </div>

      <ul className="mt-4 grid grid-cols-2 gap-2 text-sm text-slate-600 dark:text-slate-300">
        <li><span className="font-medium">Feels like:</span> {Math.round(main.feels_like)}{tempUnit}</li>
        <li><span className="font-medium">Humidity:</span> {main.humidity}%</li>
        <li><span className="font-medium">Wind:</span> {Math.round(wind.speed)} {windUnit}</li>
        <li><span className="font-medium">Min/Max:</span> {Math.round(main.temp_min)} / {Math.round(main.temp_max)}{tempUnit}</li>
      </ul>
    </div>
  );
}

export default WeatherCard;