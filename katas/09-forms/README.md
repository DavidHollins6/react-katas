# 09 · Forms: sign-up with validation

**You'll practise:** handling form submission, `event.preventDefault()`, keeping several fields in one state object, and showing validation errors.

## The story

The app needs a sign-up form. It should check what people typed before letting them in, and tell them clearly what's wrong.

## Your task

Open `src/App.jsx`. The form fields are there, but nothing is wired up.

1. Make the three fields (**`Name`**, **`Email`**, **`Password`**) controlled inputs.
2. When the form is submitted (by clicking **`Sign up`** or pressing Enter), stop the page from reloading and check the values:

   | Field    | Rule                     | Error message                             |
   | -------- | ------------------------ | ----------------------------------------- |
   | Name     | must not be empty        | `Name is required`                        |
   | Email    | must contain an `@`      | `Enter a valid email`                     |
   | Password | at least 8 characters    | `Password must be at least 8 characters`  |

3. Show **every** error that applies, at once, next to its field.
4. If everything is valid, replace the form with **`Welcome, <name>!`**

## Done when

- [ ] No errors show before the first submit.
- [ ] Submitting an empty form shows all three errors.
- [ ] Fixing a field and submitting again removes that field's error.
- [ ] A valid submission shows `Welcome, <name>!` and the form disappears.
- [ ] Pressing Enter in a field submits the form too.

## Run it

```bash
pnpm dev 9
pnpm test 9
pnpm test:solution 9
```

<details>
<summary>Hint 1: one state object for the whole form</summary>

Rather than three separate `useState`s, you can keep the form in one object. Give each input a `name` matching its key, and one change handler covers them all:

```jsx
const [form, setForm] = useState({ name: '', email: '', password: '' });

const handleChange = (e) => {
  setForm({ ...form, [e.target.name]: e.target.value });
};

<input name="email" value={form.email} onChange={handleChange} />
```

</details>

<details>
<summary>Hint 2: submitting</summary>

Put the handler on the `<form>`, not the button. That way, Enter works for free:

```jsx
<form onSubmit={handleSubmit}>

function handleSubmit(e) {
  e.preventDefault(); // stop the browser reloading the page
  ...
}
```

</details>

<details>
<summary>Hint 3: errors</summary>

Write a small function that returns an object of errors, e.g. `{ email: 'Enter a valid email' }`. Store that in state when the form is submitted. If the object is empty (`Object.keys(errors).length === 0`), the form is valid.

Render an error under its field with `{errors.email && <p className="error">{errors.email}</p>}`.

</details>
