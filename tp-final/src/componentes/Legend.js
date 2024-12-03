// Legend.js
import React from 'react';

const Legend = ({ layers }) => {
  const activeLayer = layers.find(layer => layer.get('active'));

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
        {layers.filter(layer => layer.getVisible()).map((layer, index) => (
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