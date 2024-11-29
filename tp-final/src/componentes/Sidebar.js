import React from 'react';

const Sidebar = ({ layers, handleLayerChange, handleZoom }) => {
  return (
    <div className="sidebar p-3">
      <button className="btn btn-primary mb-2" onClick={() => handleZoom(true)}>Zoom In</button>
      <button className="btn btn-secondary mb-2" onClick={() => handleZoom(false)}>Zoom Out</button>
      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          checked={layers.osm}
          onChange={() => handleLayerChange('osm')}
        />
        <label className="form-check-label">
          OSM
        </label>
      </div>
      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          checked={layers.actividadesEconomicas}
          onChange={() => handleLayerChange('actividadesEconomicas')}
        />
        <label className="form-check-label">
          Actividades Económicas
        </label>
      </div>
    </div>
  );
};

export default Sidebar;