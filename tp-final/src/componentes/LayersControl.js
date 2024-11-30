import React from 'react';

const LayersControl = ({ layers, handleLayerChange, osmLayerRef, actividadesEconomicasLayerRef, actividadesAgropecuariasLayerRef }) => {
  const handleChange = (layerName) => {
    handleLayerChange(layerName, {
      osmLayerRef,
      actividadesEconomicasLayerRef,
      actividadesAgropecuariasLayerRef
    });
  };

  return (
    <div className="sidebar p-3">
      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          checked={layers.osm}
          onChange={() => handleChange('osm')}
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
          onChange={() => handleChange('actividadesEconomicas')}
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
          onChange={() => handleChange('actividadesAgropecuarias')}
        />
        <label className="form-check-label">
          Actividades Agropecuarias
        </label>
      </div>
    </div>
  );
};

export default LayersControl;