import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './App.css';

function App({ initialDate = null }) {
  const [menu, setMenu] = useState([]);
  const [selectedDate, setSelectedDate] = useState(initialDate);
  const [quantities, setQuantities] = useState({});
  const handleReserve = () => {
    // TODO: implement reservation logic
  };

  useEffect(() => {
    const menuUrl = process.env.PUBLIC_URL + '/menu.json';
    fetch(menuUrl)
      .then((res) => res.json())
      .then((data) => setMenu(data))
      .catch((err) => console.error('Failed to load menu:', err));
  }, []);

  const changeQuantity = (index, delta) => {
    setQuantities((prev) => {
      const current = prev[index] || 0;
      const next = Math.max(current + delta, 0);
      const updated = { ...prev };
      if (next === 0) {
        delete updated[index];
      } else {
        updated[index] = next;
      }
      return updated;
    });
  };

  const totalPrice = menu.reduce(
    (sum, item, i) => sum + (quantities[i] || 0) * (item.price || 0),
    0
  );

  return (
    <div className="App">
      <h1>Welcome to Bento Order</h1>
      <div className="date-picker">
        <label htmlFor="order-date">注文日:</label>
        <DatePicker
          id="order-date"
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          dateFormat="yyyy-MM-dd"
        />
      </div>
      {selectedDate ? (
        <>
          <h2>Menu</h2>
          <ul>
            {menu.map((item, index) => (
              <li key={index}>
                <span>
                  {item.name} - {item.price}円
                </span>
                <div className="quantity-controls">
                  <button onClick={() => changeQuantity(index, -1)}>-</button>
                  <span>{quantities[index] || 0}</span>
                  <button onClick={() => changeQuantity(index, 1)}>+</button>
                </div>
              </li>
            ))}
          </ul>
          <p>合計: {totalPrice}円</p>
        </>
      ) : (
        <p>まずは注文したい日を選択してください。</p>
      )}
      <button className="reserve-button" onClick={handleReserve}>予約</button>
    </div>
  );
}

export default App;
