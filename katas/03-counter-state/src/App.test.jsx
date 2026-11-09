import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App.jsx';

const setup = () => {
  const user = userEvent.setup();
  render(<App />);
  return {
    user,
    plus: screen.getByRole('button', { name: '+1' }),
    minus: screen.getByRole('button', { name: '-1' }),
    reset: screen.getByRole('button', { name: 'Reset' }),
  };
};

describe('03 · Counter state', () => {
  it('starts at 0', () => {
    setup();
    expect(screen.getByText('Count: 0')).toBeInTheDocument();
  });

  it('+1 increases the count', async () => {
    const { user, plus } = setup();
    await user.click(plus);
    await user.click(plus);
    await user.click(plus);
    expect(screen.getByText('Count: 3')).toBeInTheDocument();
  });

  it('-1 decreases the count', async () => {
    const { user, plus, minus } = setup();
    await user.click(plus);
    await user.click(plus);
    await user.click(minus);
    expect(screen.getByText('Count: 1')).toBeInTheDocument();
  });

  it('Reset sets the count back to 0', async () => {
    const { user, plus, reset } = setup();
    await user.click(plus);
    await user.click(plus);
    await user.click(reset);
    expect(screen.getByText('Count: 0')).toBeInTheDocument();
  });

  it('-1 is disabled at 0, and enabled once the count is above 0', async () => {
    const { user, plus, minus } = setup();
    expect(minus).toBeDisabled();
    await user.click(plus);
    expect(minus).toBeEnabled();
    await user.click(minus);
    expect(minus).toBeDisabled();
    expect(screen.getByText('Count: 0')).toBeInTheDocument();
  });
});
