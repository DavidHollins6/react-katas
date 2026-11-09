import { useState } from 'react';

// TODO: finish this hook.
// It should behave like useState, but also:
//   - start from the value saved in localStorage under `key` (if there is one)
//   - save the value to localStorage (as JSON) whenever it changes
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(initialValue);
  return [value, setValue];
}

export default function App() {
  // TODO: swap these for useLocalStorage('nickname', '') and useLocalStorage('darkMode', false)
  const [nickname, setNickname] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  const theme = darkMode
    ? { background: '#1f2330', color: '#f6f5f2' }
    : { background: 'white', color: '#1f2330' };

  return (
    <main>
      <h1>⚙️ Settings</h1>

      <div className="card" style={theme}>
        <label htmlFor="nickname">Nickname</label>
        <input id="nickname" value={nickname} onChange={(e) => setNickname(e.target.value)} />

        <label>
          <input
            type="checkbox"
            checked={darkMode}
            onChange={(e) => setDarkMode(e.target.checked)}
          />{' '}
          Dark mode
        </label>

        <p>{nickname ? `Hi, ${nickname}!` : 'Pick a nickname.'}</p>
      </div>

      <p className="muted">Refresh the page. Are your settings still here?</p>
    </main>
  );
}
