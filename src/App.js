import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [menu, setMenu] = useState([]);

  const handleReserve = () => {
    // reservation handling will be implemented later
  };

  useEffect(() => {
    const menuUrl = process.env.PUBLIC_URL + '/menu.json';
    fetch(menuUrl)
      .then((res) => res.json())
      .then((data) => setMenu(data))
      .catch((err) => console.error('Failed to load menu:', err));
  }, []);

  return (
    <div className="App">
      <h1>Welcome to Bento Order</h1>
      <h2>Menu</h2>
      <ul>
        {menu.map((item, index) => (
          <li key={index}>
            {item.name} - {item.price}円
          </li>
        ))}
      </ul>
      <button className="reserve-button" onClick={handleReserve}>
        予約
      </button>
    </div>
  );
}

export default App;
