import React, { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './componentes/NavBar';
import Sidebar from './componentes/Sidebar';
import MapComponent from './componentes/MapComponent';

function App() {
  const [layers, setLayers] = useState([]);
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

  return (
    <div className="App">
      <Navbar map={map} isDrawing={isDrawing} onDrawButtonClick={handleDrawButtonClick} onClearDrawings={handleClearDrawings} />
      <div className="container-fluid main-content">
        <div className="row content-row">
          <div className="col-10 map-container">
            <MapComponent onLayersUpdate={handleLayersUpdate} onMapUpdate={handleMapUpdate} />
          </div>
          <div className="col-2 sidebar-container">
            <Sidebar layers={layers} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
