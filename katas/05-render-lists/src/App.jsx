// TODO: import useState

const initialItems = [
  { id: 1, name: 'Milk', bought: false },
  { id: 2, name: 'Bread', bought: true },
  { id: 3, name: 'Eggs', bought: false },
  { id: 4, name: 'Bananas', bought: false },
  { id: 5, name: 'Coffee', bought: false },
];

export default function App() {
  // TODO: keep the items in state, starting from `initialItems`

  return (
    <main>
      <h1>🛒 Shopping list</h1>

      {/* TODO: show "<bought> of <total> bought" */}
      <p className="muted">? of ? bought</p>

      <ul className="card">
        {/* TODO: render one <li> per item, with a checkbox and a Remove button */}
      </ul>
    </main>
  );
}
