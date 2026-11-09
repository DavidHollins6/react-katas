// Kata 07: see README.md for what to build.

export default function App() {
  const users = [];

  return (
    <main>
      <h1>📇 Staff directory</h1>

      <ul>
        {users.map((user) => (
          <li key={user.id} className="card">
            <strong>{user.name}</strong>
            <br />
            <span className="muted">{user.email}</span>
          </li>
        ))}
      </ul>
    </main>
  );
}
