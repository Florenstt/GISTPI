// Navbar.js
import React from 'react';
import { Button } from 'reactstrap';
import LengthMeasurement from './LengthMeasurement';
import AreaMeasurement from './AreaMeasurement';
import './NavBar.css';

const Navbar = ({ map, isDrawing, onDrawButtonClick, onClearDrawings, onAddAgroActivityClick, drawType, setDrawType }) => {
  const handleDrawButtonClick = (type) => {
    if (isDrawing && drawType === type) {
      onClearDrawings();
      setDrawType(null);
    } else {
      setDrawType(type);
    }
    onDrawButtonClick();
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
        {map && isDrawing && drawType === 'length' && <LengthMeasurement map={map} isDrawing={isDrawing} />}
        {map && isDrawing && drawType === 'area' && <AreaMeasurement map={map} isDrawing={isDrawing} />}
      </div>
    </div>
  );
};

export default Navbar;