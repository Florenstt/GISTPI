import React, { useState } from 'react';
import './App.css';
import NavBar from './componentes/NavBar';
import Sidebar from './componentes/Sidebar';
import MapComponent from './componentes/MapComponent';

function App() {
  const [items, setItems] = useState(['Cosa 1', 'Cosa 2', 'Cosa 3']);

  return (
    <div className="App">
      <NavBar />
      <div className="container-fluid main-content">
        <div className="row content-row">
          <div className="col-10 map-container">
            <MapComponent />
          </div>
          <div className="col-2 sidebar-container">
            <Sidebar items={items} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
