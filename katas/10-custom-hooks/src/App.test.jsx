import { act, render, renderHook, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App, { useLocalStorage } from './App.jsx';

beforeEach(() => localStorage.clear());

describe('10 · useLocalStorage (the hook on its own)', () => {
  it('returns the initial value when nothing is saved', () => {
    const { result } = renderHook(() => useLocalStorage('score', 5));
    expect(result.current[0]).toBe(5);
  });

  it('returns the saved value when there is one', () => {
    localStorage.setItem('score', JSON.stringify(42));
    const { result } = renderHook(() => useLocalStorage('score', 5));
    expect(result.current[0]).toBe(42);
  });

  it('updates the value like useState', () => {
    const { result } = renderHook(() => useLocalStorage('score', 5));
    act(() => result.current[1](10));
    expect(result.current[0]).toBe(10);
  });

  it('saves the value to localStorage as JSON', () => {
    const { result } = renderHook(() => useLocalStorage('flags', { a: true }));
    act(() => result.current[1]({ a: false, b: 2 }));
    expect(JSON.parse(localStorage.getItem('flags'))).toEqual({ a: false, b: 2 });
  });
});

describe('10 · Settings page', () => {
  it('saves the nickname under "nickname"', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.type(screen.getByLabelText('Nickname'), 'Ada');
    expect(JSON.parse(localStorage.getItem('nickname'))).toBe('Ada');
  });

  it('saves dark mode under "darkMode"', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByRole('checkbox', { name: 'Dark mode' }));
    expect(JSON.parse(localStorage.getItem('darkMode'))).toBe(true);
  });

  it('remembers settings after a "refresh"', async () => {
    const user = userEvent.setup();
    const first = render(<App />);
    await user.type(screen.getByLabelText('Nickname'), 'Grace');
    await user.click(screen.getByRole('checkbox', { name: 'Dark mode' }));
    first.unmount();

    render(<App />); // like reloading the page
    expect(screen.getByLabelText('Nickname')).toHaveValue('Grace');
    expect(screen.getByRole('checkbox', { name: 'Dark mode' })).toBeChecked();
  });
});
