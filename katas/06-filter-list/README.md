# 06 · Filtering: a searchable animal directory

**You'll practise:** filtering a list from state, combining two filters, and showing an "empty" message.

## The story

The zoo's website lists every animal, but there are too many to scroll through. Visitors need a search box and a dropdown to narrow it down. The list is already on the page, but the search box and dropdown don't do anything yet.

## Your task

Open `src/App.jsx`.

1. Make the **`Search`** input filter the animals by name.
   - It should **ignore upper and lower case**: `LI`, `li` and `Li` should all match *Lion*.
   - It should match **anywhere** in the name: `fish` matches *Clownfish*.
2. Make the **`Type`** dropdown filter by type. **`All`** shows every type.
3. The two filters work **together**. For example, Search `p` + Type `Bird` shows only *Penguin* and *Parrot*.
4. Show **`Showing <n> of <total>`** above the list.
5. If nothing matches, show **`No animals found`** in place of the list.

## Done when

- [ ] Search filters by name, ignoring case.
- [ ] The Type dropdown filters by type.
- [ ] Both filters work together.
- [ ] The count and the "No animals found" message are right.

## Run it

```bash
pnpm dev 6
pnpm test 6
pnpm test:solution 6
```

<details>
<summary>Hint 1</summary>

You need **two** pieces of state, one for the search text and one for the selected type. Both inputs should be controlled (see kata 04).

You **don't** need a third piece of state for the filtered list. Work it out on every render:

```jsx
const visible = animals.filter((animal) => /* ...return true to keep it... */);
```

</details>

<details>
<summary>Hint 2</summary>

To ignore case, lower-case both sides before comparing:

```jsx
animal.name.toLowerCase().includes(search.toLowerCase())
```

</details>

<details>
<summary>Hint 3</summary>

Show one thing or another with a ternary:

```jsx
{visible.length === 0 ? <p>No animals found</p> : <ul>...</ul>}
```

</details>
