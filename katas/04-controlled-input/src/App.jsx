// Kata 04: see README.md for what to build.

const MAX_LENGTH = 20;

export default function App() {
  const name = '';

  return (
    <main>
      <h1>🏷️ Name tag maker</h1>

      <label htmlFor="name">Your name</label>
      <div className="row">
        <input id="name" />
        <button>Clear</button>
      </div>
      <p className="muted">? / {MAX_LENGTH}</p>

      <div className="card">
        <p>Hello, my name is {name}</p>
      </div>
    </main>
  );
}
