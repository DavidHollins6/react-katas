// TODO: import useState

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
  // TODO: add state for the search text and the selected type

  // TODO: work out which animals to show based on the search and type
  const visible = animals;

  return (
    <main>
      <h1>🦁 Zoo directory</h1>

      <div className="row">
        <div>
          <label htmlFor="search">Search</label>
          {/* TODO: make this controlled */}
          <input id="search" placeholder="e.g. lion" />
        </div>
        <div>
          <label htmlFor="type">Type</label>
          {/* TODO: make this controlled */}
          <select id="type">
            {types.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* TODO: show the real numbers */}
      <p className="muted">Showing ? of ?</p>

      {/* TODO: show "No animals found" when nothing matches */}
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
