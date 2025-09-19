import { useState } from 'react';

function SearchBar({ onSearch, initialValue = '' }) {
  const [value, setValue] = useState(initialValue);

  const submit = (e) => {
    e.preventDefault();
    const city = value.trim();
    if (city) onSearch(city);
  };

  return (
    <form onSubmit={submit} className="flex gap-2 flex-1">
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Enter city name..."
        aria-label="City name"
        className="flex-1 px-3 py-2 rounded-lg border border-slate-300 bg-white/80 placeholder-slate-400
                   focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent
                   dark:bg-slate-800 dark:border-slate-700"
      />
      <button
        type="submit"
        className="px-4 py-2 rounded-lg bg-sky-500 text-white hover:bg-sky-600 active:bg-sky-700
                   focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500
                   dark:focus:ring-offset-slate-900"
      >
        Search
      </button>
    </form>
  );
}

export default SearchBar;