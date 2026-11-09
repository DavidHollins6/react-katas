import { render, screen } from '@testing-library/react';
import App from './App.jsx';

const users = [
  { id: 1, name: 'Ada Lovelace', email: 'ada@example.com' },
  { id: 2, name: 'Grace Hopper', email: 'grace@example.com' },
  { id: 3, name: 'Alan Turing', email: 'alan@example.com' },
];

// Replaces the browser's `fetch` with a fake one for each test.
const mockFetch = (implementation) => {
  const fake = vi.fn(implementation);
  vi.stubGlobal('fetch', fake);
  return fake;
};

const okResponse = (data) => ({ ok: true, status: 200, json: async () => data });

describe('07 · Fetching data', () => {
  it('requests /api/users exactly once', async () => {
    const fetch = mockFetch(async () => okResponse(users));
    render(<App />);
    await screen.findByText('Ada Lovelace');
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(String(fetch.mock.calls[0][0])).toMatch(/\/api\/users$/);
  });

  it('shows "Loading..." while the request is in progress', async () => {
    mockFetch(() => new Promise(() => {})); // a request that never finishes
    render(<App />);
    expect(await screen.findByText('Loading...')).toBeInTheDocument();
  });

  it('shows each user with their name and email once loaded', async () => {
    mockFetch(async () => okResponse(users));
    render(<App />);

    expect(await screen.findByText('Ada Lovelace')).toBeInTheDocument();
    expect(screen.getByText('grace@example.com')).toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(3);
  });

  it('hides "Loading..." once the data has arrived', async () => {
    mockFetch(async () => okResponse(users));
    render(<App />);
    await screen.findByText('Ada Lovelace');
    expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
  });

  it('shows "Something went wrong" when the server returns an error status', async () => {
    mockFetch(async () => ({ ok: false, status: 500, json: async () => ({}) }));
    render(<App />);
    expect(await screen.findByText('Something went wrong')).toBeInTheDocument();
    expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    expect(screen.queryAllByRole('listitem')).toHaveLength(0);
  });

  it('shows "Something went wrong" when the network fails', async () => {
    mockFetch(async () => {
      throw new TypeError('Failed to fetch');
    });
    render(<App />);
    expect(await screen.findByText('Something went wrong')).toBeInTheDocument();
    expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
  });
});
