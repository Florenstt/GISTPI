import React, { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './componentes/NavBar';
import Sidebar from './componentes/Sidebar';
import MapComponent from './componentes/MapComponent';
import Legend from './componentes/Legend';
import ScaleBarControl from './componentes/ScaleBarControl';
import { createLayers } from './componentes/LayersComponent';

function App() {
  const [layers, setLayers] = useState(createLayers());
  const [map, setMap] = useState(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [drawType, setDrawType] = useState(null);
  const [showAddAgroActivity, setShowAddAgroActivity] = useState(false);

  const handleLayersUpdate = (newLayers) => {
    setLayers(newLayers);
  };

  const handleMapUpdate = (mapInstance) => {
    setMap(mapInstance);
  };

  const handleDrawButtonClick = () => {
    setIsDrawing(!isDrawing);
  };

  const handleClearLengthMeasurements = () => {
    if (map) {
      const layersToRemove = map.getLayers().getArray().filter(layer => layer.get('name') === 'lengthLayer');
      layersToRemove.forEach(layer => map.removeLayer(layer));
      // Remove tooltips
      const tooltips = document.querySelectorAll('.ol-tooltip');
      tooltips.forEach(tooltip => tooltip.remove());
    }
  };

  const handleClearAreaMeasurements = () => {
    if (map) {
      const layersToRemove = map.getLayers().getArray().filter(layer => layer.get('name') === 'areaLayer');
      layersToRemove.forEach(layer => map.removeLayer(layer));
      // Remove tooltips
      const tooltips = document.querySelectorAll('.ol-tooltip');
      tooltips.forEach(tooltip => tooltip.remove());
    }
  };

  const handleLayerToggle = (layer) => {
    layer.setVisible(!layer.getVisible());
    setLayers([...layers]);
  };

  const handleAddAgroActivityClick = () => {
    setShowAddAgroActivity(true);
  };

  const handleCloseAddAgroActivity = () => {
    setShowAddAgroActivity(false);
  };

  return (
    <div className="App">
      <Navbar 
        map={map} 
        isDrawing={isDrawing} 
        onDrawButtonClick={handleDrawButtonClick} 
        onClearLengthMeasurements={handleClearLengthMeasurements}
        onClearAreaMeasurements={handleClearAreaMeasurements}
        onAddAgroActivityClick={handleAddAgroActivityClick} 
        drawType={drawType}
        setDrawType={setDrawType}
      />
      <div className="container-fluid main-content">
        <div className="row content-row">
          <div className="col-12 map-container">
            <MapComponent onLayersUpdate={handleLayersUpdate} onMapUpdate={handleMapUpdate} />
          </div>
          <div className="col-12 footer"> 
            <Legend layers={layers} />
          </div>
        </div>
      </div>
      <Sidebar layers={layers} onLayerToggle={handleLayerToggle} />
      {map && <ScaleBarControl map={map} />}
    </div>
  );
}

export default App;
