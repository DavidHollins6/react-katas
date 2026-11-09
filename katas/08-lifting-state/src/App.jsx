import { useState } from 'react';

// ---- Helpers (already done, no need to change these) ----
const toCelsius = (f) => ((f - 32) * 5) / 9;
const toFahrenheit = (c) => (c * 9) / 5 + 32;

// Converts a typed string using one of the functions above.
// Returns '' if the input isn't a number. Rounds to 1 decimal place.
// e.g. convert('100', toFahrenheit) -> '212'
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

// TODO: this component shouldn't own its own state.
// Make it take `value` and `onChange` props from its parent instead.
function TemperatureInput({ scale }) {
  const [value, setValue] = useState('');

  return (
    <div>
      <label htmlFor={`temp-${scale}`}>{scaleNames[scale]}</label>
      <input id={`temp-${scale}`} value={value} onChange={(e) => setValue(e.target.value)} />
    </div>
  );
}

export default function App() {
  // TODO: lift the temperature state up to here

  return (
    <main>
      <h1>🌡️ Temperature converter</h1>
      <div className="row">
        <TemperatureInput scale="c" />
        <TemperatureInput scale="f" />
      </div>
      {/* TODO: pass the temperature in Celsius */}
      <BoilingVerdict />
    </main>
  );
}
