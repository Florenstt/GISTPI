import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
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
        <ul className="list-group">
          {layers.map((layer, index) => (
            <li key={index} className="list-group-item">
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id={`flexSwitchCheck${index}`}
                  checked={layer.getVisible()}
                  onChange={() => toggleLayerVisibility(layer)}
                />
                <label className="form-check-label" htmlFor={`flexSwitchCheck${index}`}>
                  {layer.get('title')}
                </label>
              </div>
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