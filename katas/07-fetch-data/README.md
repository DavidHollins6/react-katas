# 07 · Fetching data with `useEffect`

**You'll practise:** `useEffect`, `fetch`, `async`/`await`, and handling **loading**, **success** and **error** states.

## The story

The staff directory needs to load its list of people from the server at **`GET /api/users`**. The endpoint returns JSON like this:

```json
[
  { "id": 1, "name": "Ada Lovelace", "email": "ada@example.com" },
  ...
]
```

When you run `pnpm dev 7`, a pretend server answers this request (from `api/users.json`) with a short delay, so you can see your loading state.

## Your task

Open `src/App.jsx`. When the component first appears on screen, fetch the users and show them.

## Done when

- [ ] While the request is in progress, the page shows **`Loading...`**.
- [ ] When the data arrives, each user appears as a list item showing their **name** and **email**, and `Loading...` disappears.
- [ ] If the request fails (the server responds with an error status like 500, **or** the network fails completely), the page shows **`Something went wrong`** in place of the list.
- [ ] The fetch only happens **once**, when the component first renders (not on every render).

> 💡 To see your error state in the browser, temporarily change the URL to `/api/oops`. The pretend server returns a 404 for that.

## Run it

```bash
pnpm dev 7
pnpm test 7
pnpm test:solution 7
```

> The tests don't use the pretend server. They swap out `fetch` for a fake one, so they're quick and can simulate failures too.

<details>
<summary>Hint 1: the shape</summary>

You'll want three pieces of state:

```jsx
const [users, setUsers] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);
```

Then pick what to render based on them: loading → error → list.

</details>

<details>
<summary>Hint 2: running code once</summary>

`useEffect` with an **empty dependency array** runs once, after the first render:

```jsx
useEffect(() => {
  // fetch here
}, []);
```

The effect function itself can't be `async`, so define an async function inside it and call it:

```jsx
useEffect(() => {
  async function load() { ... }
  load();
}, []);
```

</details>

<details>
<summary>Hint 3: errors</summary>

`fetch` only *throws* when the network fails. A 500 or 404 response still counts as "successful" to `fetch`, so check `response.ok` yourself:

```jsx
const response = await fetch('/api/users');
if (!response.ok) throw new Error(`HTTP ${response.status}`);
const data = await response.json();
```

Wrap it in `try { ... } catch { ... } finally { ... }`. `finally` is a good place to set `loading` to `false`.

</details>

## Stretch goals (not tested)

- Add a **`Retry`** button to the error message.
- In development, React's `<StrictMode>` runs effects twice to help you spot bugs. Look up how to *ignore* a stale response with a cleanup function, e.g. `let ignore = false; return () => { ignore = true; }`, or with an `AbortController`.
