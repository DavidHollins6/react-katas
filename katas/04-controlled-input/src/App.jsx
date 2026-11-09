// TODO: import useState

const MAX_LENGTH = 20;

export default function App() {
  // TODO: store the name in state
  const name = '';

  return (
    <main>
      <h1>🏷️ Name tag maker</h1>

      <label htmlFor="name">Your name</label>
      <div className="row">
        {/* TODO: make this a controlled input (value + onChange) */}
        <input id="name" />
        {/* TODO: clear the input when clicked */}
        <button>Clear</button>
      </div>
      {/* TODO: show the real character count */}
      <p className="muted">? / {MAX_LENGTH}</p>

      <div className="card">
        <p>Hello, my name is {name}</p>
      </div>
    </main>
  );
}
