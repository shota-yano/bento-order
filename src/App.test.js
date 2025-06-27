import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';

test('renders welcome message', () => {
  render(<App />);
  const header = screen.getByText(/Welcome to Bento Order/i);
  expect(header).toBeInTheDocument();
});

test('calculates total price when menu items are selected', async () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve([
          { name: 'テスト弁当', price: 300 },
          { name: 'サンプル弁当', price: 200 },
        ]),
    })
  );

  render(<App />);

  const dateInput = screen.getByLabelText(/注文日/);
  fireEvent.change(dateInput, { target: { value: '2023-01-01' } });
  fireEvent.blur(dateInput);

  await waitFor(() => expect(screen.getByText(/テスト弁当/)).toBeInTheDocument());

  const checkboxes = screen.getAllByRole('checkbox');
  fireEvent.click(checkboxes[0]);

  expect(screen.getByText('合計: 300円')).toBeInTheDocument();
});
