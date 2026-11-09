import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App.jsx';

const setup = () => {
  const user = userEvent.setup();
  render(<App />);
  return {
    user,
    celsius: screen.getByLabelText('Celsius'),
    fahrenheit: screen.getByLabelText('Fahrenheit'),
  };
};

describe('08 · Lifting state up', () => {
  it('typing Celsius updates Fahrenheit', async () => {
    const { user, celsius, fahrenheit } = setup();
    await user.type(celsius, '100');
    expect(fahrenheit).toHaveValue('212');
  });

  it('typing Fahrenheit updates Celsius', async () => {
    const { user, celsius, fahrenheit } = setup();
    await user.type(fahrenheit, '50');
    expect(celsius).toHaveValue('10');
  });

  it('switching boxes keeps them in sync', async () => {
    const { user, celsius, fahrenheit } = setup();
    await user.type(celsius, '0');
    expect(fahrenheit).toHaveValue('32');

    await user.clear(fahrenheit);
    await user.type(fahrenheit, '212');
    expect(celsius).toHaveValue('100');
  });

  it('clearing one box clears the other', async () => {
    const { user, celsius, fahrenheit } = setup();
    await user.type(celsius, '37');
    await user.clear(celsius);
    expect(fahrenheit).toHaveValue('');
  });

  it('says the water would boil at 100°C', async () => {
    const { user, celsius } = setup();
    await user.type(celsius, '100');
    expect(screen.getByText('The water would boil.')).toBeInTheDocument();
  });

  it('says the water would not boil below 100°C', async () => {
    const { user, celsius } = setup();
    await user.type(celsius, '99');
    expect(screen.getByText('The water would not boil.')).toBeInTheDocument();
  });

  it('works out the verdict from Fahrenheit too', async () => {
    const { user, fahrenheit } = setup();
    await user.type(fahrenheit, '220');
    expect(screen.getByText('The water would boil.')).toBeInTheDocument();
  });
});
