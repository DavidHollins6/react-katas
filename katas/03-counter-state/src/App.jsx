// Kata 03: see README.md for what to build.

export default function App() {
  const count = 0;

  return (
    <main>
      <h1>☕ Coffee counter</h1>
      <p className="card">Count: {count}</p>
      <div className="row">
        <button>-1</button>
        <button>+1</button>
        <button>Reset</button>
      </div>
    </main>
  );
}
