// Navbar.js
import React from 'react';
import { Button } from 'reactstrap';
import DrawComponent from './DrawComponent';
import './NavBar.css';

const Navbar = ({ map, isDrawing, onDrawButtonClick, onClearDrawings, onAddAgroActivityClick }) => {
  const handleDrawButtonClick = () => {
    if (isDrawing) {
      onClearDrawings();
    }
    onDrawButtonClick();
  };

  return (
    <div className="navbar-section">
      <div className="navbar-box">
        <Button color="primary" onClick={onAddAgroActivityClick}>
          Agregar Actividad Agropecuaria
        </Button>
        <Button color="secondary" onClick={handleDrawButtonClick}>
          {isDrawing ? 'Stop Drawing' : 'Start Drawing'}
        </Button>
        {map && isDrawing && <DrawComponent map={map} isDrawing={isDrawing} />}
      </div>
    </div>
  );
};

export default Navbar;