# 02 · Prop drilling: passing data down through components

**You'll practise:** passing props through several layers of components, and seeing how data flows *down* the component tree in React.

## The story

The dashboard needs to greet the signed-in user and show their plan in the sidebar. `App` receives the `user`, but the components that need it are nested a few levels deep:

```
App  (has `user`)
└── Dashboard
    ├── Header
    │   └── Greeting     ← needs user.name
    └── Sidebar
        └── UserBadge    ← needs user.name and user.plan
```

Right now `Greeting` and `UserBadge` just show `???`.

## Your task

Open `src/App.jsx` and pass `user` down from `App` all the way to `Greeting` and `UserBadge`.

## Done when

- [ ] `Greeting` shows **`Welcome back, Ada!`** (using the user's name).
- [ ] `UserBadge` shows **`Ada · Pro plan`** (using the user's name and plan).
- [ ] It works for *any* user passed to `App`. The tests render `<App user={...} />` with a different user, so don't read the `defaultUser` constant directly inside `Greeting` or `UserBadge`.

## Run it

```bash
pnpm dev 2
pnpm test 2
pnpm test:solution 2
```

<details>
<summary>Hint 1</summary>

Every component in the chain has to accept the prop **and** pass it on to its child. For example, `Dashboard` doesn't use `user` itself, but it still has to hand it down:

```jsx
function Dashboard({ user }) {
  return <Header user={user} />;
}
```

</details>

<details>
<summary>Hint 2</summary>

`Greeting` only needs the name, so you could pass just that (`<Greeting name={user.name} />`). Passing exactly what a component needs keeps it simpler and easier to reuse.

</details>

## Think about it

Passing props through components that don't use them is called **prop drilling**. It's fine for a few levels, but it gets tedious in big apps. That's why React has **Context** (`createContext` / `useContext`). If you're feeling adventurous, try solving this kata a second time with Context!
