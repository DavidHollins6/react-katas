# 08 · Lifting state up: a temperature converter

**You'll practise:** moving state up to a shared parent, and passing **callback props** (like `onChange`) down so children can ask the parent to update.

## The story

There's a temperature converter with two inputs, **Celsius** and **Fahrenheit**. Each `TemperatureInput` currently has its *own* state, so you can type in either box, but they don't talk to each other. Type `100` in Celsius and Fahrenheit stays empty. 😕

Two sibling components can't share state directly. The fix is to **lift the state up** to their nearest common parent (`App`), and pass it back down as props.

```
App              ← state lives here now
├── TemperatureInput (Celsius)      ← gets `value` + `onChange` props
├── TemperatureInput (Fahrenheit)   ← gets `value` + `onChange` props
└── BoilingVerdict                  ← gets `celsius` prop
```

## Your task

Open `src/App.jsx`.

1. Remove the `useState` from `TemperatureInput`. Make it take **`value`** and **`onChange`** props instead.
2. Store the temperature in `App`. Typing in either box should update the other one, converted.
3. Pass the temperature in Celsius to `BoilingVerdict`.

The maths is already written for you: `toCelsius`, `toFahrenheit` and `convert` are at the top of the file.

## Done when

- [ ] Typing **`100`** in Celsius shows **`212`** in Fahrenheit.
- [ ] Typing **`50`** in Fahrenheit shows **`10`** in Celsius.
- [ ] Clearing one box clears the other.
- [ ] The verdict says **`The water would boil.`** at 100°C or above, and **`The water would not boil.`** below that.

## Run it

```bash
pnpm dev 8
pnpm test 8
pnpm test:solution 8
```

<details>
<summary>Hint 1: what to store</summary>

You *could* store both numbers, but then you'd have to keep them in sync. It's simpler to store **just what the user typed, and which box they typed it in**:

```jsx
const [temperature, setTemperature] = useState('');
const [scale, setScale] = useState('c'); // 'c' or 'f'
```

Then *work out* both values on every render. (Remember from earlier katas: don't store what you can calculate.)

</details>

<details>
<summary>Hint 2: callback props</summary>

A parent can pass a **function** down as a prop. The child calls it when something happens:

```jsx
// In App
<TemperatureInput
  scale="c"
  value={celsius}
  onChange={(newValue) => { setScale('c'); setTemperature(newValue); }}
/>

// In TemperatureInput
<input value={value} onChange={(e) => onChange(e.target.value)} />
```

</details>

<details>
<summary>Hint 3: working out the values</summary>

```jsx
const celsius = scale === 'f' ? convert(temperature, toCelsius) : temperature;
const fahrenheit = scale === 'c' ? convert(temperature, toFahrenheit) : temperature;
```

</details>
