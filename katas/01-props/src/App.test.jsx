import { render, screen, within } from '@testing-library/react';
import App from './App.jsx';

const team = [
  { name: 'Ada Lovelace', role: 'Mathematician', emoji: '🧮' },
  { name: 'Grace Hopper', role: 'Computer Scientist', emoji: '🐛' },
  { name: 'Alan Turing', role: 'Codebreaker', emoji: '🔐' },
];

describe('01 · Props', () => {
  it('renders exactly three profile cards', () => {
    render(<App />);
    expect(screen.getAllByRole('article')).toHaveLength(3);
  });

  it('no longer shows the placeholder text', () => {
    render(<App />);
    expect(screen.queryByText(/name goes here/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/role goes here/i)).not.toBeInTheDocument();
  });

  it.each(team)("shows $name's name, role and emoji on the same card", ({ name, role, emoji }) => {
    render(<App />);
    const card = screen.getByText(name, { exact: false }).closest('article');
    expect(card).not.toBeNull();
    expect(within(card).getByText(role)).toBeInTheDocument();
    expect(within(card).getByText(emoji)).toBeInTheDocument();
  });
});
