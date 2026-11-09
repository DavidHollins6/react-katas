# 03 · State: a counter with `useState`

**You'll practise:** `useState`, handling click events, and updating state based on its previous value.

## The story

The café wants a simple counter to track how many coffees have been made today. The buttons are already on the page, but clicking them does nothing because the number is hard-coded.

## Your task

Open `src/App.jsx` and use `useState` to make the counter work.

## Done when

- [ ] The page starts by showing **`Count: 0`**.
- [ ] Clicking **`+1`** adds one.
- [ ] Clicking **`-1`** takes one away.
- [ ] Clicking **`Reset`** sets it back to 0.
- [ ] The count can never go below 0: the **`-1`** button is **disabled** when the count is 0.

## Run it

```bash
pnpm dev 3
pnpm test 3
pnpm test:solution 3
```

<details>
<summary>Hint 1</summary>

```jsx
import { useState } from 'react';

const [count, setCount] = useState(0);
```

`count` is the current value. Call `setCount(newValue)` to change it, and React re-renders the component with the new value.

</details>

<details>
<summary>Hint 2</summary>

Attach a function to a button with `onClick`:

```jsx
<button onClick={() => setCount(count + 1)}>+1</button>
```

Buttons have a `disabled` attribute that takes `true` or `false`, e.g. `disabled={count === 0}`.

</details>

<details>
<summary>Hint 3 (a good habit)</summary>

When the new state depends on the old state, it's safer to pass a function to the setter:

```jsx
setCount((previous) => previous + 1);
```

React calls your function with the latest value, which avoids bugs when several updates happen at once.

</details>

## Think about it

Why can't you just write `let count = 0` and do `count++` in the click handler? Try it and see what happens. What does `useState` give you that a normal variable doesn't?
