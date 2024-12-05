// Legend.js
import React, { useEffect, useState } from 'react';
import './Legend.css';

const Legend = ({ layers }) => {
  const [legendItems, setLegendItems] = useState([]);

  useEffect(() => {
    const visibleLayers = layers.filter(layer => layer.getVisible());
    const legendItems = visibleLayers.map(layer => {
      const styleUrl = layer.get('styleUrl');
      const iconSrc = layer.get('style');
      return { title: layer.get('title'), styleUrl, iconSrc };
    });
    setLegendItems(legendItems);
  }, [layers]);

  if (legendItems.length === 0) {
    return null; // No renderizar nada si no hay capas visibles
  }

  return (
    <div className="legend-section">
      {legendItems.map((item, index) => (
        <div key={index} className="legend-item">
          {item.iconSrc && <img src={item.iconSrc} alt={item.title} className="legend-icon" />}
          {item.styleUrl && <img src={item.styleUrl} alt={item.title} className="legend-style" />}
          <span>{item.title}</span>
        </div>
      ))}
    </div>
  );
};

export default Legend;