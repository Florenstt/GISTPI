import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './App.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import NavBar from './componentes/NavBar';
import Sidebar from './componentes/Sidebar';
import MapComponent from './componentes/MapComponent';
import Legend from './componentes/Legend';
import ScaleBarControl from './componentes/ScaleBarControl';
import LengthMeasurement from './componentes/LengthMeasurement';
import AreaMeasurement from './componentes/AreaMeasurement';
import { createLayers } from './componentes/LayersComponent';

function MainApp() {
  const [layers, setLayers] = useState(createLayers());
  const [map, setMap] = useState(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [drawType, setDrawType] = useState(null);
  const [showAddAgroActivity, setShowAddAgroActivity] = useState(false);
  const [coordinates, setCoordinates] = useState(null);

  const handleLayersUpdate = (newLayers) => {
    setLayers(newLayers);
  };

  const handleMapUpdate = (mapInstance) => {
    setMap(mapInstance);
    layers.forEach(layer => layer.set('map', mapInstance));
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
      <NavBar 
        map={map} 
        isDrawing={isDrawing} 
        onDrawButtonClick={handleDrawButtonClick} 
        onClearLengthMeasurements={handleClearLengthMeasurements}
        onClearAreaMeasurements={handleClearAreaMeasurements}
        drawType={drawType}
        setDrawType={setDrawType}
        layers={layers}
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
      {map && isDrawing && drawType === 'length' && <LengthMeasurement map={map} isDrawing={isDrawing} />}
      {map && isDrawing && drawType === 'area' && <AreaMeasurement map={map} isDrawing={isDrawing} />}
      {map && <ScaleBarControl map={map} />}
    </div>
  );
}

export default App;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <MainApp />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
