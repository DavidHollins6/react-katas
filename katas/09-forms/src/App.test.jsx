import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App.jsx';

const hasText = (text) => (_, el) =>
  el?.textContent.replace(/\s+/g, ' ').trim() === text &&
  ![...el.children].some((child) => child.textContent.replace(/\s+/g, ' ').trim() === text);

const ERRORS = {
  name: 'Name is required',
  email: 'Enter a valid email',
  password: 'Password must be at least 8 characters',
};

const setup = () => {
  const user = userEvent.setup();
  render(<App />);
  return {
    user,
    name: screen.getByLabelText('Name'),
    email: screen.getByLabelText('Email'),
    password: screen.getByLabelText('Password'),
    submit: screen.getByRole('button', { name: 'Sign up' }),
  };
};

describe('09 · Forms', () => {
  it('does not show any errors before submitting', () => {
    setup();
    for (const message of Object.values(ERRORS)) {
      expect(screen.queryByText(message)).not.toBeInTheDocument();
    }
  });

  it('the fields are controlled and keep what you type', async () => {
    const { user, name, email, password } = setup();
    await user.type(name, 'Ada');
    await user.type(email, 'ada@example.com');
    await user.type(password, 'analytical');
    expect(name).toHaveValue('Ada');
    expect(email).toHaveValue('ada@example.com');
    expect(password).toHaveValue('analytical');
  });

  it('submitting an empty form shows all three errors', async () => {
    const { user, submit } = setup();
    await user.click(submit);
    for (const message of Object.values(ERRORS)) {
      expect(screen.getByText(message)).toBeInTheDocument();
    }
  });

  it('only shows errors for the fields that are wrong', async () => {
    const { user, name, email, password, submit } = setup();
    await user.type(name, 'Ada');
    await user.type(email, 'not-an-email');
    await user.type(password, 'short');
    await user.click(submit);

    expect(screen.queryByText(ERRORS.name)).not.toBeInTheDocument();
    expect(screen.getByText(ERRORS.email)).toBeInTheDocument();
    expect(screen.getByText(ERRORS.password)).toBeInTheDocument();
  });

  it('fixing a field and resubmitting removes its error', async () => {
    const { user, name, submit } = setup();
    await user.click(submit);
    expect(screen.getByText(ERRORS.name)).toBeInTheDocument();

    await user.type(name, 'Ada');
    await user.click(submit);
    expect(screen.queryByText(ERRORS.name)).not.toBeInTheDocument();
  });

  it('a valid submission shows a welcome message and hides the form', async () => {
    const { user, name, email, password, submit } = setup();
    await user.type(name, 'Ada');
    await user.type(email, 'ada@example.com');
    await user.type(password, 'analytical');
    await user.click(submit);

    expect(screen.getByText(hasText('Welcome, Ada!'))).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Sign up' })).not.toBeInTheDocument();
  });

  it('pressing Enter submits the form', async () => {
    const { user, name, email, password } = setup();
    await user.type(name, 'Grace');
    await user.type(email, 'grace@example.com');
    await user.type(password, 'compilers{Enter}');
    expect(screen.getByText(hasText('Welcome, Grace!'))).toBeInTheDocument();
  });
});
