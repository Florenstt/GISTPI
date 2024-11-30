import React from 'react';
import './App.css';
import MapComponent from './componentes/MapComponent';

function App() {
  return (
    <div className="App">
      <div className="left-bar">Barra Izquierda</div>
      <div className="map-container">
        <MapComponent />
      </div>
      <div className="right-bar">Barra Derecha</div>
    </div>
  );
}

export default App;
