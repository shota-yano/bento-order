import { render, screen } from '@testing-library/react';
import App from './App';

test('renders welcome message', () => {
  render(<App />);
  const header = screen.getByText(/Welcome to Bento Order/i);
  expect(header).toBeInTheDocument();
});

test('renders reserve button', () => {
  render(<App />);
  const button = screen.getByRole('button', { name: '予約' });
  expect(button).toBeInTheDocument();
});
