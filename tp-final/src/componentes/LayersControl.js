import React from 'react';

const LayersControl = ({ layers, handleLayerChange, handleZoom }) => {
  return (
    <div className="sidebar p-3">
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
      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          checked={layers.actividadesAgropecuarias}
          onChange={() => handleLayerChange('actividadesAgropecuarias')}
        />
        <label className="form-check-label">
          Actividades Agropecuarias
        </label>
      </div>
      <div className="zoom-controls">
        <button className="btn btn-primary mb-2" onClick={() => handleZoom(true)}>Zoom In</button>
        <button className="btn btn-secondary mb-2" onClick={() => handleZoom(false)}>Zoom Out</button>
      </div>
    </div>
  );
};

export default LayersControl;