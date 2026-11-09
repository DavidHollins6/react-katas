import { useEffect, useState } from 'react';

export default function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // `ignore` stops us updating state from a stale request
    // (e.g. when StrictMode runs this effect twice in development).
    let ignore = false;

    async function load() {
      try {
        const response = await fetch('/api/users');
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        if (!ignore) setUsers(data);
      } catch (err) {
        if (!ignore) setError(err);
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    load();
    return () => {
      ignore = true;
    };
  }, []);

  return (
    <main>
      <h1>📇 Staff directory</h1>

      {loading ? (
        <p className="muted">Loading...</p>
      ) : error ? (
        <p className="error">Something went wrong</p>
      ) : (
        <ul>
          {users.map((user) => (
            <li key={user.id} className="card">
              <strong>{user.name}</strong>
              <br />
              <span className="muted">{user.email}</span>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
