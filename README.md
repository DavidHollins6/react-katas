# ⚛️ React Katas

Small, focused exercises for practising React, one idea at a time.

Each kata is a tiny single-page React app with:

- a **`README.md`** that explains the task, what "done" looks like, and has hints (hidden until you click them)
- a starter **`src/App.jsx`** to build on. It renders, but doesn't do what the README asks yet. Working out *where* the changes go is part of the exercise.
- **tests** in `src/App.test.jsx` that tell you when you've got it right
- a **`solution/App.jsx`** to compare with *after* you've had a go

## Getting started

You need [Node.js](https://nodejs.org) (v20 or newer) and [pnpm](https://pnpm.io/installation).

```bash
pnpm install       # once, from the repo root
pnpm katas         # show all the katas
```

## Doing a kata

Everything runs from the repo root. Just give it the kata number:

```bash
pnpm dev 3             # open kata 03 in your browser (auto-reloads as you save)
pnpm test 3            # run kata 03's tests against your code (re-runs as you save)
pnpm test:solution 3   # run kata 03's tests against the solution
```

A good loop is to have **two terminals open**, one running `pnpm dev 3` and one running `pnpm test 3`. Then edit `katas/03-counter-state/src/App.jsx` and watch the tests go from red ❌ to green ✅.

Every kata's tests **fail at the start**. That's expected. Your job is to make them pass.

## The katas

They get gradually harder, and each one builds on ideas from the ones before.

| #  | Kata                                                       | You'll practise                                          |
| -- | ---------------------------------------------------------- | -------------------------------------------------------- |
| 01 | [Props](katas/01-props)                                    | Passing and reading props, reusing a component           |
| 02 | [Prop drilling](katas/02-prop-drilling)                    | Passing data down through several components             |
| 03 | [Counter state](katas/03-counter-state)                    | `useState`, click events, disabling buttons              |
| 04 | [Controlled input](katas/04-controlled-input)              | `value` + `onChange`, derived values                     |
| 05 | [Rendering lists](katas/05-render-lists)                   | `.map()`, `key`, updating arrays immutably               |
| 06 | [Filtering a list](katas/06-filter-list)                   | Filtering, combining filters, empty states               |
| 07 | [Fetching data](katas/07-fetch-data)                       | `useEffect`, `fetch`, loading and error states           |
| 08 | [Lifting state up](katas/08-lifting-state)                 | Shared state in a parent, callback props                 |
| 09 | [Forms](katas/09-forms)                                    | Form submission, validation, one state object per form   |
| 10 | [Custom hooks](katas/10-custom-hooks)                      | Writing your own hook, `localStorage`                    |

## Tips

- **Read the test file** if you're stuck on exactly what's expected. The test names are written as plain sentences.
- **Open the browser DevTools console.** React's warnings there (like missing `key`s) are really useful.
- **Try before peeking.** The hints go from gentle nudges to nearly the answer. Open them one at a time.
- **Want to start over?** Run `git checkout katas/03-counter-state/src/App.jsx` to reset that kata.
- **Done them all?** Try redoing one in a different way. Each README has a "Think about it" or "Stretch goals" section.

## How it's set up (for the curious)

- It's a **pnpm workspace**, so every folder in `katas/` is its own small app, but they share one `node_modules`.
- **Vite** runs each app. **Vitest** and **React Testing Library** run the tests.
- All katas share one config, `kata.config.js`. It also provides a pretend API for kata 07: any JSON file in a kata's `api/` folder is served at `/api/<filename>`.
- `pnpm test:all-solutions` checks every solution still passes. It's handy if you add your own katas.

### Adding a new kata

Copy an existing kata folder and change its `name` in `package.json`. Then rewrite the `README.md`, `src/App.jsx`, `src/App.test.jsx` and `solution/App.jsx`.
