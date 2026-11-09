# 10 · Custom hooks: `useLocalStorage`

**You'll practise:** writing your own hook, reusing logic between bits of state, `useEffect` with dependencies, and lazy initial state.

## The story

The settings page has a **Nickname** field and a **Dark mode** checkbox. Both work, but when you refresh the page, everything resets. Users want their settings remembered.

The browser's `localStorage` can save strings between visits. You *could* add saving and loading code for each setting separately, but that's repetitive. Instead, you'll write a **custom hook** that works just like `useState` but also remembers its value.

## Your task

Open `src/App.jsx`.

1. Finish the **`useLocalStorage(key, initialValue)`** hook. It should:
   - return `[value, setValue]`, exactly like `useState`
   - start with the value saved in `localStorage` under `key` if there is one, otherwise `initialValue`
   - save the value to `localStorage` under `key` whenever it changes, using `JSON.stringify` (so numbers and booleans survive the trip)
2. In `App`, replace both `useState` calls with `useLocalStorage`:
   - nickname → key **`"nickname"`**, starting value `''`
   - dark mode → key **`"darkMode"`**, starting value `false`

## Done when

- [ ] Typing a nickname saves it to `localStorage` under `"nickname"`.
- [ ] Ticking Dark mode saves `true` under `"darkMode"`.
- [ ] Refreshing the page keeps both settings.
- [ ] The hook works on its own too. The tests call it directly with other keys and values.

## Run it

```bash
pnpm dev 10
pnpm test 10
pnpm test:solution 10
```

> In the browser, you can watch the values appear in DevTools → **Application** → **Local Storage**.

<details>
<summary>Hint 1: what a custom hook is</summary>

A custom hook is just a function whose name starts with `use` that calls other hooks. There's nothing magic about it:

```jsx
function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(initialValue);
  // ...extra behaviour here...
  return [value, setValue];
}
```

</details>

<details>
<summary>Hint 2: loading the saved value</summary>

`useState` accepts a **function** as its starting value. React only calls it on the first render, which is perfect for reading from `localStorage` once:

```jsx
const [value, setValue] = useState(() => {
  const saved = localStorage.getItem(key);
  return saved !== null ? JSON.parse(saved) : initialValue;
});
```

</details>

<details>
<summary>Hint 3: saving on change</summary>

An effect that depends on `value` runs every time `value` changes:

```jsx
useEffect(() => {
  localStorage.setItem(key, JSON.stringify(value));
}, [key, value]);
```

</details>

## Stretch goals (not tested)

- What happens if someone has put invalid JSON in `localStorage` by hand? Make the hook handle that gracefully with `try`/`catch`.
- Write a second hook, `useToggle(initial)`, that returns `[on, toggle]`, and use it for dark mode alongside `useLocalStorage`.
