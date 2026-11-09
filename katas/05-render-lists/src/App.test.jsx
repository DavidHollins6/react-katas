import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App.jsx';

const hasText = (text) => (_, el) =>
  el?.textContent.replace(/\s+/g, ' ').trim() === text &&
  ![...el.children].some((child) => child.textContent.replace(/\s+/g, ' ').trim() === text);

const setup = () => {
  const user = userEvent.setup();
  render(<App />);
  return { user };
};

describe('05 · Rendering lists', () => {
  it('renders all five items', () => {
    setup();
    expect(screen.getAllByRole('listitem')).toHaveLength(5);
    for (const name of ['Milk', 'Bread', 'Eggs', 'Bananas', 'Coffee']) {
      expect(screen.getByRole('checkbox', { name })).toBeInTheDocument();
    }
  });

  it('checkboxes reflect the starting data (Bread is already bought)', () => {
    setup();
    expect(screen.getByRole('checkbox', { name: 'Bread' })).toBeChecked();
    expect(screen.getByRole('checkbox', { name: 'Milk' })).not.toBeChecked();
  });

  it('shows how many items are bought', () => {
    setup();
    expect(screen.getByText(hasText('1 of 5 bought'))).toBeInTheDocument();
  });

  it('ticking and unticking an item updates it and the summary', async () => {
    const { user } = setup();
    const milk = screen.getByRole('checkbox', { name: 'Milk' });

    await user.click(milk);
    expect(milk).toBeChecked();
    expect(screen.getByText(hasText('2 of 5 bought'))).toBeInTheDocument();

    await user.click(milk);
    expect(milk).not.toBeChecked();
    expect(screen.getByText(hasText('1 of 5 bought'))).toBeInTheDocument();
  });

  it('Remove deletes only that item', async () => {
    const { user } = setup();
    await user.click(screen.getByRole('button', { name: 'Remove Eggs' }));

    expect(screen.queryByRole('checkbox', { name: 'Eggs' })).not.toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(4);
    expect(screen.getByText(hasText('1 of 4 bought'))).toBeInTheDocument();
  });

  it('removing a bought item updates the bought count too', async () => {
    const { user } = setup();
    await user.click(screen.getByRole('button', { name: 'Remove Bread' }));
    expect(screen.getByText(hasText('0 of 4 bought'))).toBeInTheDocument();
  });
});
