// Kata 06: see README.md for what to build.

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
  const visible = animals;

  return (
    <main>
      <h1>🦁 Zoo directory</h1>

      <div className="row">
        <div>
          <label htmlFor="search">Search</label>
          <input id="search" placeholder="e.g. lion" />
        </div>
        <div>
          <label htmlFor="type">Type</label>
          <select id="type">
            {types.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
      </div>

      <p className="muted">Showing ? of ?</p>

      <ul className="card">
        {visible.map((animal) => (
          <li key={animal.id}>
            {animal.name} <span className="muted">({animal.type})</span>
          </li>
        ))}
      </ul>
    </main>
  );
}
