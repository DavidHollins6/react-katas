# 04 · Controlled inputs: a name tag maker

**You'll practise:** controlled inputs (`value` + `onChange`), reading `event.target.value`, and showing values derived from state.

## The story

You're building a name tag printer for a conference. As people type their name, a live preview of the name tag should update.

## Your task

Open `src/App.jsx`. Store the input's text in state and make the preview, character count and Clear button work.

## Done when

- [ ] Typing in the **`Your name`** input updates the preview to say **`Hello, my name is <name>`**.
- [ ] A character counter shows **`<n> / 20`**, e.g. `3 / 20` after typing `Ada`.
- [ ] Names are limited to **20 characters**. Typing more has no effect.
- [ ] Clicking **`Clear`** empties the input, and the counter goes back to `0 / 20`.

## Run it

```bash
pnpm dev 4
pnpm test 4
pnpm test:solution 4
```

<details>
<summary>Hint 1</summary>

A **controlled input** gets its value from state, and updates that state whenever it changes:

```jsx
const [name, setName] = useState('');

<input value={name} onChange={(event) => setName(event.target.value)} />
```

React state is now the single source of truth for what's in the box.

</details>

<details>
<summary>Hint 2</summary>

You don't need extra state for the character count. Work it out from `name` on each render: `name.length`. Anything you can calculate from existing state shouldn't be its own state.

For the limit, you can either add the `maxLength={20}` attribute to the input, or ignore changes that are too long inside `onChange`.

</details>

<details>
<summary>Hint 3</summary>

Because the input is controlled, clearing it is just `setName('')`.

</details>
