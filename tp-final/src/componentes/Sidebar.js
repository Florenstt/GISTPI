// Sidebar.js
import React from 'react';
import './Sidebar.css';

const Sidebar = ({ items }) => {
  return (
    <div className="sidebar">
      <h3>Lista de Cosas</h3>
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;