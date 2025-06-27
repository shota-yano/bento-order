import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

test('renders welcome message', () => {
  render(<App />);
  const header = screen.getByText(/Welcome to Bento Order/i);
  expect(header).toBeInTheDocument();
});

afterEach(() => {
  jest.restoreAllMocks();
});

test('calculates total after selecting quantities', async () => {
  const mockMenu = [
    { name: 'からあげ弁当', price: 100 },
    { name: 'のり弁当', price: 200 },
  ];
  global.fetch = jest.fn(() =>
    Promise.resolve({ json: () => Promise.resolve(mockMenu) })
  );

  render(<App />);

  const karaInput = await screen.findByLabelText('からあげ弁当 quantity');
  const noriInput = await screen.findByLabelText('のり弁当 quantity');

  await userEvent.clear(karaInput);
  await userEvent.type(karaInput, '2');
  await userEvent.clear(noriInput);
  await userEvent.type(noriInput, '1');

  expect(screen.getByText('合計: 400円')).toBeInTheDocument();
});
