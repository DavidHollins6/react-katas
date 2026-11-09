import { useState } from 'react';

const MAX_LENGTH = 20;

export default function App() {
  const [name, setName] = useState('');

  return (
    <main>
      <h1>🏷️ Name tag maker</h1>

      <label htmlFor="name">Your name</label>
      <div className="row">
        <input
          id="name"
          value={name}
          maxLength={MAX_LENGTH}
          onChange={(event) => setName(event.target.value)}
        />
        <button onClick={() => setName('')}>Clear</button>
      </div>
      <p className="muted">
        {name.length} / {MAX_LENGTH}
      </p>

      <div className="card">
        <p>Hello, my name is {name}</p>
      </div>
    </main>
  );
}
