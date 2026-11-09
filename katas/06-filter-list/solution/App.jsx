import { useState } from 'react';

const animals = [
  { id: 1, name: 'Lion', type: 'Mammal' },
  { id: 2, name: 'Penguin', type: 'Bird' },
  { id: 3, name: 'Python', type: 'Reptile' },
  { id: 4, name: 'Clownfish', type: 'Fish' },
  { id: 5, name: 'Elephant', type: 'Mammal' },
  { id: 6, name: 'Parrot', type: 'Bird' },
  { id: 7, name: 'Tortoise', type: 'Reptile' },
  { id: 8, name: 'Shark', type: 'Fish' },
  { id: 9, name: 'Giraffe', type: 'Mammal' },
  { id: 10, name: 'Flamingo', type: 'Bird' },
];

const types = ['All', 'Mammal', 'Bird', 'Reptile', 'Fish'];

export default function App() {
  const [search, setSearch] = useState('');
  const [type, setType] = useState('All');

  const visible = animals.filter((animal) => {
    const matchesSearch = animal.name.toLowerCase().includes(search.trim().toLowerCase());
    const matchesType = type === 'All' || animal.type === type;
    return matchesSearch && matchesType;
  });

  return (
    <main>
      <h1>🦁 Zoo directory</h1>

      <div className="row">
        <div>
          <label htmlFor="search">Search</label>
          <input
            id="search"
            placeholder="e.g. lion"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="type">Type</label>
          <select id="type" value={type} onChange={(e) => setType(e.target.value)}>
            {types.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
      </div>

      <p className="muted">
        Showing {visible.length} of {animals.length}
      </p>

      {visible.length === 0 ? (
        <p>No animals found</p>
      ) : (
        <ul className="card">
          {visible.map((animal) => (
            <li key={animal.id}>
              {animal.name} <span className="muted">({animal.type})</span>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
