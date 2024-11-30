// Sidebar.js
import React from 'react';
import './Sidebar.css';

const Sidebar = ({ layers }) => {
  const toggleLayerVisibility = (layer) => {
    const visibility = layer.getVisible();
    layer.setVisible(!visibility);
  };

  return (
    <div className="sidebar">
      <h3>Capas</h3>
      <ul>
        {layers.map((layer, index) => (
          <li key={index}>
            {layer.get('title')}
            <button onClick={() => toggleLayerVisibility(layer)}>
              {layer.getVisible() ? 'Ocultar' : 'Mostrar'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;