// TODO: import useState and useEffect

export default function App() {
  // TODO: add state for the users, whether it's loading, and any error

  // TODO: fetch '/api/users' once when the component first renders

  const users = [];

  return (
    <main>
      <h1>📇 Staff directory</h1>

      {/* TODO: show "Loading..." while loading, and "Something went wrong" if it fails */}

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
