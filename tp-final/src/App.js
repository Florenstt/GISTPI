import React from 'react';
import Sidebar from './componentes/Sidebar';
import './App.css';
import MapComponent from './componentes/MapComponent';

function App() {
  return (
    <div className="App">
      <Sidebar />
      <div className="content">
        {/* Aquí va el contenido principal de tu aplicación */}
        <h1>Contenido Principal</h1>
        <MapComponent />
      </div>
    </div>
  );
}

export default App;
