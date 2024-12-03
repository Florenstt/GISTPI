import React, { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './componentes/NavBar';
import Sidebar from './componentes/Sidebar';
import MapComponent from './componentes/MapComponent';
import Legend from './componentes/Legend';
import { createLayers } from './componentes/LayersComponent';

function App() {
  const [layers, setLayers] = useState(createLayers());
  const [map, setMap] = useState(null);
  const [isDrawing, setIsDrawing] = useState(false);

  const handleLayersUpdate = (newLayers) => {
    setLayers(newLayers);
  };

  const handleMapUpdate = (mapInstance) => {
    setMap(mapInstance);
  };

  const handleDrawButtonClick = () => {
    setIsDrawing(!isDrawing);
  };

  const handleClearDrawings = () => {
    if (map) {
      const layersToRemove = map.getLayers().getArray().filter(layer => layer.get('name') === 'drawLayer');
      layersToRemove.forEach(layer => map.removeLayer(layer));
      // Remove tooltips
      const tooltips = document.querySelectorAll('.ol-tooltip');
      tooltips.forEach(tooltip => tooltip.remove());
    }
  };

  const toggleLayerVisibility = (layer) => {
    const visibility = layer.getVisible();
    layer.setVisible(!visibility);
    setLayers([...layers]);
  };

  return (
    <div className="App">
      <Navbar map={map} isDrawing={isDrawing} onDrawButtonClick={handleDrawButtonClick} onClearDrawings={handleClearDrawings} />
      <div className="container-fluid main-content">
        <div className="row content-row">
          <div className="col-10">
            <MapComponent onLayersUpdate={handleLayersUpdate} onMapUpdate={handleMapUpdate} />
            <Legend layers={layers} />
            <Sidebar layers={layers} onLayerToggle={toggleLayerVisibility} />
          </div>
          
        </div>
      </div>
    </div>
  );
}

export default App;
