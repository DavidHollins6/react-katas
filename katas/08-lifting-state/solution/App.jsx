import { useState } from 'react';

// ---- Helpers ----
const toCelsius = (f) => ((f - 32) * 5) / 9;
const toFahrenheit = (c) => (c * 9) / 5 + 32;

function convert(input, convertFn) {
  const number = parseFloat(input);
  if (Number.isNaN(number)) return '';
  return String(Math.round(convertFn(number) * 10) / 10);
}

const scaleNames = { c: 'Celsius', f: 'Fahrenheit' };

// ---- Components ----

function BoilingVerdict({ celsius }) {
  if (celsius === '' || celsius === undefined) return null;
  return (
    <p className="card">
      {parseFloat(celsius) >= 100 ? 'The water would boil.' : 'The water would not boil.'}
    </p>
  );
}

function TemperatureInput({ scale, value, onChange }) {
  return (
    <div>
      <label htmlFor={`temp-${scale}`}>{scaleNames[scale]}</label>
      <input id={`temp-${scale}`} value={value} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}

export default function App() {
  // Store only what the user typed, and which box they typed it in.
  const [temperature, setTemperature] = useState('');
  const [scale, setScale] = useState('c');

  const celsius = scale === 'f' ? convert(temperature, toCelsius) : temperature;
  const fahrenheit = scale === 'c' ? convert(temperature, toFahrenheit) : temperature;

  const handleChange = (newScale) => (newValue) => {
    setScale(newScale);
    setTemperature(newValue);
  };

  return (
    <main>
      <h1>🌡️ Temperature converter</h1>
      <div className="row">
        <TemperatureInput scale="c" value={celsius} onChange={handleChange('c')} />
        <TemperatureInput scale="f" value={fahrenheit} onChange={handleChange('f')} />
      </div>
      <BoilingVerdict celsius={celsius} />
    </main>
  );
}
