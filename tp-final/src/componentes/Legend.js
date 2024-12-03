// Legend.js
import React from 'react';
import './Legend.css';

const Legend = ({ layers }) => {
  const activeLayer = layers.find(layer => layer.get('active'));
  const visibleLayers = layers.filter(layer => layer.getVisible());

  // Solo renderiza la leyenda si hay al menos una capa visible
  if (visibleLayers.length === 0) {
    return null;
  }

  return (
    <div className="legend-section">
      <h3>Leyenda</h3>
      {activeLayer && (
        <div className="active-layer">
          <h4>Active Layer</h4>
          <p>Title: {activeLayer.get('title')}</p>
          <img src={activeLayer.get('styleUrl')} alt="Layer Style" />
        </div>
      )}
      <ul className="legend-list">
        {visibleLayers.map((layer, index) => (
          <li key={index} className="legend-item">
            <img src={layer.get('styleUrl')} alt="Layer Style" className="legend-symbol" />
            <span className="legend-title">{layer.get('title')}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Legend;