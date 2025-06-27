import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [menu, setMenu] = useState([]);
  const [quantities, setQuantities] = useState([]);

  useEffect(() => {
    const menuUrl = process.env.PUBLIC_URL + '/menu.json';
    fetch(menuUrl)
      .then((res) => res.json())
      .then((data) => {
        setMenu(data);
        setQuantities(new Array(data.length).fill(0));
      })
      .catch((err) => console.error('Failed to load menu:', err));
  }, []);

  const handleQuantityChange = (index, value) => {
    const updated = [...quantities];
    updated[index] = Number(value);
    setQuantities(updated);
  };

  const total = menu.reduce((sum, item, index) => {
    const qty = quantities[index] || 0;
    return sum + item.price * qty;
  }, 0);

  return (
    <div className="App">
      <h1>Welcome to Bento Order</h1>
      <h2>Menu</h2>
      <ul>
        {menu.map((item, index) => (
          <li key={index}>
            {item.name} - {item.price}円
            <input
              type="number"
              min="0"
              aria-label={`${item.name} quantity`}
              value={quantities[index] || 0}
              onChange={(e) => handleQuantityChange(index, e.target.value)}
            />
          </li>
        ))}
      </ul>
      <h3>合計: {total}円</h3>
    </div>
  );
}

export default App;
