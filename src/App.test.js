import React from 'react';
import { act } from 'react-dom/test-utils';
import { createRoot } from 'react-dom/client';
import App from './App';

let container;
let root;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
  root = createRoot(container);
});

afterEach(() => {
  root.unmount();
  document.body.removeChild(container);
  container = null;
});

test('renders welcome message', () => {
  global.fetch = jest.fn(() => Promise.resolve({ json: () => Promise.resolve([]) }));
  act(() => {
    root.render(<App />);
  });
  expect(container.textContent).toMatch(/Welcome to Bento Order/);
});

test('calculates total price when quantity is increased', async () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve([
          { name: 'テスト弁当', price: 300 },
          { name: 'サンプル弁当', price: 200 },
        ]),
    })
  );

  await act(async () => {
    root.render(<App initialDate={new Date('2023-01-01')} />);
  });

  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 0));
  });

  const addButton = Array.from(container.querySelectorAll('button')).find(
    (b) => b.textContent.trim() === '追加'
  );

  expect(addButton).toBeTruthy();

  await act(async () => {
    addButton.dispatchEvent(new MouseEvent('click', { bubbles: true }));
  });

  expect(container.textContent).toMatch('合計: 300円');
});
