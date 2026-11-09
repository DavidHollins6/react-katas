// TODO: import useState

export default function App() {
  // TODO: store the form values, the errors, and whether sign-up succeeded

  // TODO: handle the form being submitted
  //  - stop the page reloading
  //  - validate the fields
  //  - show errors, or show "Welcome, <name>!" if everything is valid

  return (
    <main>
      <h1>✍️ Sign up</h1>

      <form className="card">
        <label htmlFor="name">Name</label>
        <input id="name" name="name" />

        <label htmlFor="email">Email</label>
        <input id="email" name="email" />

        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="password" />

        <p>
          <button type="submit">Sign up</button>
        </p>
      </form>
    </main>
  );
}
