import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App.jsx';

// Matches text even if it's split across several JSX expressions, e.g. {name.length} / {MAX}
const hasText = (text) => (_, el) =>
  el?.textContent.replace(/\s+/g, ' ').trim() === text &&
  ![...el.children].some((child) => child.textContent.replace(/\s+/g, ' ').trim() === text);

const setup = () => {
  const user = userEvent.setup();
  render(<App />);
  return { user, input: screen.getByLabelText('Your name') };
};

describe('04 · Controlled input', () => {
  it('updates the preview as you type', async () => {
    const { user, input } = setup();
    await user.type(input, 'Ada');
    expect(input).toHaveValue('Ada');
    expect(screen.getByText(hasText('Hello, my name is Ada'))).toBeInTheDocument();
  });

  it('shows the character count', async () => {
    const { user, input } = setup();
    expect(screen.getByText(hasText('0 / 20'))).toBeInTheDocument();
    await user.type(input, 'Ada');
    expect(screen.getByText(hasText('3 / 20'))).toBeInTheDocument();
  });

  it('limits the name to 20 characters', async () => {
    const { user, input } = setup();
    await user.type(input, 'Alexandria Ocasio-Cortez the Third');
    expect(input.value).toHaveLength(20);
    expect(screen.getByText(hasText('20 / 20'))).toBeInTheDocument();
  });

  it('Clear empties the input and resets the count', async () => {
    const { user, input } = setup();
    await user.type(input, 'Grace');
    await user.click(screen.getByRole('button', { name: 'Clear' }));
    expect(input).toHaveValue('');
    expect(screen.getByText(hasText('0 / 20'))).toBeInTheDocument();
  });
});
