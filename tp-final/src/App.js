import React, { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './componentes/NavBar';
import Sidebar from './componentes/Sidebar';
import MapComponent from './componentes/MapComponent';
import DrawComponent from './componentes/DrawComponent';

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

  return (
    <div className="App">
      <Navbar map={map} onDrawButtonClick={handleDrawButtonClick} />
      <div className="container-fluid main-content">
        <div className="row content-row">
          <div className="col-10 map-container">
            <MapComponent onLayersUpdate={handleLayersUpdate} onMapUpdate={handleMapUpdate} />
            {map && isDrawing && <DrawComponent map={map} />}
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
