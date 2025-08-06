import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './App.css';

function App({ initialDate = null }) {
  const [menu, setMenu] = useState([]);
  const [selectedDate, setSelectedDate] = useState(initialDate);
  const [cart, setCart] = useState({});
  const [showCart, setShowCart] = useState(false);
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

  const addToCart = (index) => {
    setCart((prev) => {
      const current = prev[index] || 0;
      return { ...prev, [index]: current + 1 };
    });
    setShowCart(true);
  };

  const changeCartQuantity = (index, delta) => {
    setCart((prev) => {
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

  const cartItems = Object.keys(cart);

  const totalPrice = cartItems.reduce((sum, key) => {
    const i = Number(key);
    return sum + (cart[i] || 0) * (menu[i]?.price || 0);
  }, 0);

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
                <button className="add-button" onClick={() => addToCart(index)}>
                  追加
                </button>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p>まずは注文したい日を選択してください。</p>
      )}
      {showCart && (
        <div className="cart-panel">
          <h3>買い物かご</h3>
          <ul>
            {cartItems.map((key) => {
              const i = Number(key);
              const item = menu[i];
              return (
                <li key={key}>
                  <span>{item.name}</span>
                  <div className="quantity-controls">
                    <button onClick={() => changeCartQuantity(i, -1)}>-</button>
                    <span>{cart[i]}</span>
                    <button onClick={() => changeCartQuantity(i, 1)}>+</button>
                  </div>
                </li>
              );
            })}
          </ul>
          <p>合計: {totalPrice}円</p>
        </div>
      )}
      <button className="reserve-button" onClick={handleReserve}>予約</button>
    </div>
  );
}

export default App;
