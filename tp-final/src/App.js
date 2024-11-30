import React, { useState } from 'react';
import './App.css';
import NavBar from './componentes/NavBar';
import Sidebar from './componentes/Sidebar';
import MapComponent from './componentes/MapComponent';

function App() {
  const [layers, setLayers] = useState([]);

  const handleLayersUpdate = (newLayers) => {
    setLayers(newLayers);
  };

  return (
    <div className="App">
      <NavBar />
      <div className="container-fluid main-content">
        <div className="row content-row">
          <div className="col-10 map-container">
            <MapComponent onLayersUpdate={handleLayersUpdate} />
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
