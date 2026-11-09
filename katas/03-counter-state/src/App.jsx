// TODO: import useState from 'react'

export default function App() {
  // TODO: replace this hard-coded number with state
  const count = 0;

  return (
    <main>
      <h1>☕ Coffee counter</h1>
      <p className="card">Count: {count}</p>
      <div className="row">
        {/* TODO: make these buttons update the count */}
        <button>-1</button>
        <button>+1</button>
        <button>Reset</button>
      </div>
    </main>
  );
}
