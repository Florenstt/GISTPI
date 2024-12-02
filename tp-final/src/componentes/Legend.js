// Legend.js
import React from 'react';

const Legend = ({ layers }) => {
  return (
    <div className="legend-section">
      <h3>Leyenda</h3>
      <ul className="legend-list">
        {layers.filter(layer => layer.getVisible()).map((layer, index) => (
          <li key={index} className="legend-item">
            <span className="legend-symbol" style={{ backgroundColor: layer.get('color') }}></span>
            <span className="legend-title">{layer.get('title')}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Legend;