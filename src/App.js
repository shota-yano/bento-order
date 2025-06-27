import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    fetch('/menu.json')
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
    </div>
  );
}

export default App;
