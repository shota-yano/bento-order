import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './App.css';

function App() {
  const [menu, setMenu] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);
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
      <button className="reserve-button" onClick={handleReserve}>予約</button>
    </div>
  );
}

export default App;
