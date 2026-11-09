// Kata 05: see README.md for what to build.

const initialItems = [
  { id: 1, name: 'Milk', bought: false },
  { id: 2, name: 'Bread', bought: true },
  { id: 3, name: 'Eggs', bought: false },
  { id: 4, name: 'Bananas', bought: false },
  { id: 5, name: 'Coffee', bought: false },
];

export default function App() {
  return (
    <main>
      <h1>🛒 Shopping list</h1>

      <p className="muted">? of ? bought</p>

      <ul className="card"></ul>
    </main>
  );
}
