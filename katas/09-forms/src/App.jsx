// Kata 09: see README.md for what to build.

export default function App() {
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
