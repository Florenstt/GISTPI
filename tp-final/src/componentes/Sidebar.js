// Sidebar.js
import React from 'react';
import './Sidebar.css';
import LegendComponent from './LegendComponent';

const Sidebar = ({ layers }) => {
  const toggleLayerVisibility = (layer) => {
    const visibility = layer.getVisible();
    layer.setVisible(!visibility);
  };

  return (
    <div className="sidebar">
        <div className="layers-section">
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
        <div className="legend-section">
            <h3>Leyenda</h3>
            <LegendComponent layers={layers} />

            {/* Aquí puedes agregar el contenido de la leyenda */}
        </div>
      
    </div>
  );
};

export default Sidebar;