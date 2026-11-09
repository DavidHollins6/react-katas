import { render, screen } from '@testing-library/react';
import App from './App.jsx';

// Matches text even if it's split across several JSX expressions, e.g. {name} · {plan} plan
const hasText = (text) => (_, el) =>
  el?.textContent.replace(/\s+/g, ' ').trim() === text &&
  ![...el.children].some((child) => child.textContent.replace(/\s+/g, ' ').trim() === text);

describe('02 · Prop drilling', () => {
  it('greets the default user', () => {
    render(<App />);
    expect(screen.getByText(hasText('Welcome back, Ada!'))).toBeInTheDocument();
  });

  it("shows the default user's badge", () => {
    render(<App />);
    expect(screen.getByText(hasText('Ada · Pro plan'))).toBeInTheDocument();
  });

  it('works for a different user passed into App', () => {
    render(<App user={{ name: 'Grace', plan: 'Free' }} />);
    expect(screen.getByText(hasText('Welcome back, Grace!'))).toBeInTheDocument();
    expect(screen.getByText(hasText('Grace · Free plan'))).toBeInTheDocument();
  });

  it('has no ??? placeholders left', () => {
    render(<App />);
    expect(screen.queryByText(/\?\?\?/)).not.toBeInTheDocument();
  });
});
