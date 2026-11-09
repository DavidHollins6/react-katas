import { useState } from 'react';

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <main>
      <h1>☕ Coffee counter</h1>
      <p className="card">Count: {count}</p>
      <div className="row">
        <button onClick={() => setCount((c) => c - 1)} disabled={count === 0}>
          -1
        </button>
        <button onClick={() => setCount((c) => c + 1)}>+1</button>
        <button onClick={() => setCount(0)}>Reset</button>
      </div>
    </main>
  );
}
