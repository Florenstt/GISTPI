import React, { useState, useRef, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './componentes/NavBar';
import Sidebar from './componentes/Sidebar';
import MapComponent from './componentes/MapComponent';
import ScaleBarControl from './componentes/ScaleBarControl';

function App() {
  const [layers, setLayers] = useState([]);
  const [map, setMap] = useState(null);

  const handleLayersUpdate = (newLayers) => {
    setLayers(newLayers);
  };

  const handleMapUpdate = (mapInstance) => {
    setMap(mapInstance);
  };

  return (
    <div className="App">
      <NavBar />
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
      {map && <ScaleBarControl map={map} />}
    </div>
  );
}

export default App;
