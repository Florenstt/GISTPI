import React, { useState, useEffect } from 'react';
import './Sidebar.css';
import LegendComponent from './LegendComponent';

const Sidebar = ({ layers }) => {
  const [visibleLayers, setVisibleLayers] = useState([]);

  useEffect(() => {
    const initialVisibleLayers = layers.filter(layer => layer.getVisible());
    setVisibleLayers(initialVisibleLayers);
  }, [layers]);

  const toggleLayerVisibility = (layer) => {
    const visibility = layer.getVisible();
    layer.setVisible(!visibility);
    if (!visibility) {
      setVisibleLayers([...visibleLayers, layer]);
    } else {
      setVisibleLayers(visibleLayers.filter(l => l !== layer));
    }
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
        <LegendComponent layers={visibleLayers} />
      </div>
    </div>
  );
};

export default Sidebar;