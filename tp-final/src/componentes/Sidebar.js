// Sidebar.js
import React from 'react';
import LayersControl from './LayersControl';

const Sidebar = ({ layers, handleLayerChange, osmLayerRef, actividadesEconomicasLayerRef, actividadesAgropecuariasLayerRef }) => {
  return (
    <div className="sidebar">
      <h2>Navigation</h2>
      <LayersControl 
        layers={layers} 
        handleLayerChange={handleLayerChange} 
        osmLayerRef={osmLayerRef}
        actividadesEconomicasLayerRef={actividadesEconomicasLayerRef}
        actividadesAgropecuariasLayerRef={actividadesAgropecuariasLayerRef}
      />
    </div>
  );
};

export default Sidebar;