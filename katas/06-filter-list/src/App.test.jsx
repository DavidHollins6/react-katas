import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App.jsx';

const hasText = (text) => (_, el) =>
  el?.textContent.replace(/\s+/g, ' ').trim() === text &&
  ![...el.children].some((child) => child.textContent.replace(/\s+/g, ' ').trim() === text);

// Returns just the animal names currently shown, e.g. ['Lion', 'Penguin']
const visibleNames = () =>
  screen.queryAllByRole('listitem').map((li) => li.textContent.replace(/\(.*\)/, '').trim());

const setup = () => {
  const user = userEvent.setup();
  render(<App />);
  return {
    user,
    search: screen.getByLabelText('Search'),
    type: screen.getByLabelText('Type'),
  };
};

describe('06 · Filtering a list', () => {
  it('shows all ten animals to start with', () => {
    setup();
    expect(visibleNames()).toHaveLength(10);
    expect(screen.getByText(hasText('Showing 10 of 10'))).toBeInTheDocument();
  });

  it('filters by name, ignoring case', async () => {
    const { user, search } = setup();
    await user.type(search, 'LI');
    expect(visibleNames()).toEqual(['Lion']);
  });

  it('matches anywhere in the name', async () => {
    const { user, search } = setup();
    await user.type(search, 'fish');
    expect(visibleNames()).toEqual(['Clownfish']);
  });

  it('filters by type', async () => {
    const { user, type } = setup();
    await user.selectOptions(type, 'Bird');
    expect(visibleNames()).toEqual(['Penguin', 'Parrot', 'Flamingo']);
    expect(screen.getByText(hasText('Showing 3 of 10'))).toBeInTheDocument();
  });

  it('"All" shows every type again', async () => {
    const { user, type } = setup();
    await user.selectOptions(type, 'Fish');
    await user.selectOptions(type, 'All');
    expect(visibleNames()).toHaveLength(10);
  });

  it('combines search and type', async () => {
    const { user, search, type } = setup();
    await user.type(search, 'p');
    await user.selectOptions(type, 'Bird');
    expect(visibleNames()).toEqual(['Penguin', 'Parrot']);
    expect(screen.getByText(hasText('Showing 2 of 10'))).toBeInTheDocument();
  });

  it('shows "No animals found" when nothing matches', async () => {
    const { user, search } = setup();
    await user.type(search, 'unicorn');
    expect(visibleNames()).toHaveLength(0);
    expect(screen.getByText('No animals found')).toBeInTheDocument();
    expect(screen.getByText(hasText('Showing 0 of 10'))).toBeInTheDocument();
  });

  it('does not show "No animals found" when there are matches', () => {
    setup();
    expect(screen.queryByText('No animals found')).not.toBeInTheDocument();
  });
});
