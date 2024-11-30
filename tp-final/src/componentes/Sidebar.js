// Sidebar.js
import React from 'react';
import LayersControl from './LayersControl';
import MeasureComponent from './MeasureComponent';
import ScaleBarControl from './ScaleBarControl';

const Sidebar = ({ layers, handleLayerChange, osmLayerRef, actividadesEconomicasLayerRef, actividadesAgropecuariasLayerRef, map }) => {
  return (
    <div className="sidebar">
      <LayersControl 
        layers={layers} 
        handleLayerChange={handleLayerChange} 
        osmLayerRef={osmLayerRef}
        actividadesEconomicasLayerRef={actividadesEconomicasLayerRef}
        actividadesAgropecuariasLayerRef={actividadesAgropecuariasLayerRef}
      />
      <MeasureComponent map={map} />
      <ScaleBarControl map={map} />
    </div>
  );
};

export default Sidebar;