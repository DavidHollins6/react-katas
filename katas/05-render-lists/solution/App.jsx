import { useState } from 'react';

const initialItems = [
  { id: 1, name: 'Milk', bought: false },
  { id: 2, name: 'Bread', bought: true },
  { id: 3, name: 'Eggs', bought: false },
  { id: 4, name: 'Bananas', bought: false },
  { id: 5, name: 'Coffee', bought: false },
];

export default function App() {
  const [items, setItems] = useState(initialItems);

  const toggle = (id) =>
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, bought: !item.bought } : item)),
    );

  const remove = (id) => setItems((prev) => prev.filter((item) => item.id !== id));

  const boughtCount = items.filter((item) => item.bought).length;

  return (
    <main>
      <h1>🛒 Shopping list</h1>

      <p className="muted">
        {boughtCount} of {items.length} bought
      </p>

      <ul className="card">
        {items.map((item) => (
          <li key={item.id} className="row">
            <label style={{ textDecoration: item.bought ? 'line-through' : 'none', margin: 0 }}>
              <input type="checkbox" checked={item.bought} onChange={() => toggle(item.id)} />{' '}
              {item.name}
            </label>
            <button aria-label={`Remove ${item.name}`} onClick={() => remove(item.id)}>
              ✕
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
}
