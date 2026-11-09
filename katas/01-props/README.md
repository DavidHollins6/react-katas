# 01 · Props: your first reusable component

**You'll practise:** passing props into a component, reading them, and reusing one component with different data.

## The story

The team page needs a card for each person on the team. Someone has started a `ProfileCard`, but every card shows the same placeholder text. Your job is to make the card reusable.

## Your task

Open `src/App.jsx`.

1. Change `ProfileCard` so it accepts **`name`**, **`role`** and **`emoji`** props and displays them, not the placeholder text.
2. In `App`, render **one `ProfileCard` for each person** in the `team` array, passing in their details.
   - For this kata, you can write out three `<ProfileCard ... />` lines by hand. (Kata 05 covers looping over arrays.)

## Done when

- [ ] All three names show on the page: **Ada Lovelace**, **Grace Hopper** and **Alan Turing**.
- [ ] Each person's role shows on their own card.
- [ ] Each person's emoji shows on their own card.
- [ ] There are exactly three cards. (Each card is an `<article>`. That's already in the starter code.)

## Run it

```bash
pnpm dev 1            # see it in the browser
pnpm test 1           # run the tests (re-runs as you save)
pnpm test:solution 1  # check the tests pass against the solution
```

<details>
<summary>Hint 1</summary>

Props arrive as the first argument to your component function, as an object:

```jsx
function ProfileCard(props) {
  return <h2>{props.name}</h2>;
}
```

</details>

<details>
<summary>Hint 2</summary>

You can *destructure* props right in the function signature, which most React code does:

```jsx
function ProfileCard({ name, role, emoji }) { ... }
```

And you pass props like HTML attributes, using `{}` for JavaScript values:

```jsx
<ProfileCard name={team[0].name} role={team[0].role} emoji={team[0].emoji} />
```

</details>

When you're done, compare your code with `solution/App.jsx`.
