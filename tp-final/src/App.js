import React, { useState, useRef, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './componentes/NavBar'; // Asegúrate de que la ruta sea correcta
import Sidebar from './componentes/Sidebar'; // Asegúrate de que la ruta sea correcta
import MapComponent from './componentes/MapComponent'; // Asegúrate de que la ruta sea correcta

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
      <Navbar map={map} />
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
