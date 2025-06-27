import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [menu, setMenu] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    const menuUrl = process.env.PUBLIC_URL + '/menu.json';
    fetch(menuUrl)
      .then((res) => res.json())
      .then((data) => setMenu(data))
      .catch((err) => console.error('Failed to load menu:', err));
  }, []);

  const handleToggle = (index) => {
    setSelectedItems((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const totalPrice = selectedItems.reduce(
    (sum, i) => sum + (menu[i]?.price || 0),
    0
  );

  return (
    <div className="App">
      <h1>Welcome to Bento Order</h1>
      <div className="date-picker">
        <label>
          注文日:
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </label>
      </div>
      {selectedDate ? (
        <>
          <h2>Menu</h2>
          <ul>
            {menu.map((item, index) => (
              <li key={index}>
                <label>
                  <input
                    type="checkbox"
                    checked={selectedItems.includes(index)}
                    onChange={() => handleToggle(index)}
                  />
                  {item.name} - {item.price}円
                </label>
              </li>
            ))}
          </ul>
          <p>合計: {totalPrice}円</p>
        </>
      ) : (
        <p>まずは注文したい日を選択してください。</p>
      )}
    </div>
  );
}

export default App;
