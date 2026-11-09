# 05 · Lists: a shopping list

**You'll practise:** rendering arrays with `.map()`, the `key` prop, and updating arrays held in state *without mutating them*.

## The story

You're making a shopping list app. The data is ready in `initialItems`. Now it needs to appear on screen, and you need to be able to tick items off and remove them.

## Your task

Open `src/App.jsx`.

1. Render every item as an `<li>` in the list. Each `<li>` should contain:
   - a **checkbox** labelled with the item's name (wrap both in a `<label>`)
   - a **`Remove`** button with `aria-label={`Remove ${item.name}`}`, so screen readers (and the tests) know which item it removes
2. Ticking a checkbox marks the item as bought. Unticking it marks it as not bought.
3. Clicking **Remove** takes the item off the list.
4. Above the list, show a summary like **`2 of 5 bought`**.

## Done when

- [ ] All 5 starting items appear as list items.
- [ ] Ticking or unticking a checkbox updates the item and the summary.
- [ ] Remove deletes just that item.
- [ ] Bought items have a line through them. (This one isn't tested, it's just a nice touch: `style={{ textDecoration: 'line-through' }}`.)
- [ ] There are no "unique key" warnings in the browser console.

## Run it

```bash
pnpm dev 5
pnpm test 5
pnpm test:solution 5
```

<details>
<summary>Hint 1: rendering</summary>

```jsx
<ul>
  {items.map((item) => (
    <li key={item.id}>{item.name}</li>
  ))}
</ul>
```

React needs a `key` on each item so it can tell them apart between renders. Use a stable ID, not the array index.

</details>

<details>
<summary>Hint 2: toggling</summary>

Never change state directly (`item.bought = true` ❌). Make a **new** array with a **new** object for the item that changed:

```jsx
setItems((prev) =>
  prev.map((item) => (item.id === id ? { ...item, bought: !item.bought } : item)),
);
```

</details>

<details>
<summary>Hint 3: removing and counting</summary>

`.filter()` returns a new array without the items you don't want:

```jsx
setItems((prev) => prev.filter((item) => item.id !== id));
```

The "bought" count can be worked out from state on each render: `items.filter((i) => i.bought).length`.

</details>
