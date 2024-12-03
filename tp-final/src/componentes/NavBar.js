// Navbar.js
import React from 'react';
import { Button } from 'reactstrap';
import './NavBar.css';

const Navbar = ({ map, isDrawing, onDrawButtonClick, onClearLengthMeasurements, onClearAreaMeasurements, onAddAgroActivityClick, drawType, setDrawType }) => {
  const handleDrawButtonClick = (type) => {
    if (isDrawing && drawType === type) {
      if (type === 'length') {
        onClearLengthMeasurements();
      } else if (type === 'area') {
        onClearAreaMeasurements();
      }
      setDrawType(null);
    } else {
      setDrawType(type);
    }
    onDrawButtonClick();
  };

  const handleZoomIn = () => {
    if (map) {
      const view = map.getView();
      const zoom = view.getZoom();
      view.setZoom(zoom + 1);
    }
  };

  const handleZoomOut = () => {
    if (map) {
      const view = map.getView();
      const zoom = view.getZoom();
      view.setZoom(zoom - 1);
    }
  };

  return (
    <div className="navbar-section">
      <div className="navbar-box">
        <Button color="primary" onClick={onAddAgroActivityClick}>
          Agregar Actividad Agropecuaria
        </Button>
        <Button color="secondary" onClick={() => handleDrawButtonClick('length')}>
          {isDrawing && drawType === 'length' ? 'Stop Length Measurement' : 'Start Length Measurement'}
        </Button>
        <Button color="secondary" onClick={() => handleDrawButtonClick('area')}>
          {isDrawing && drawType === 'area' ? 'Stop Area Measurement' : 'Start Area Measurement'}
        </Button>
        <Button color="secondary" onClick={handleZoomIn}>
          Zoom In
        </Button>
        <Button color="secondary" onClick={handleZoomOut}>
          Zoom Out
        </Button>
      </div>
    </div>
  );
};

export default Navbar;