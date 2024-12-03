// Navbar.js
import React, { useState } from 'react';
import { Button } from 'reactstrap';
import AddAgroActivityComponent from './AddAgroActivityComponent'; // Importa el componente
import './NavBar.css';

const Navbar = ({ map, isDrawing, onDrawButtonClick, onClearLengthMeasurements, onClearAreaMeasurements, drawType, setDrawType }) => {
  const [showAddAgroActivity, setShowAddAgroActivity] = useState(false); // Estado para controlar la visibilidad del modal

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

  const handleAddAgroActivityClick = () => {
    setShowAddAgroActivity(true);
  };

  const handleCloseAddAgroActivity = () => {
    setShowAddAgroActivity(false);
  };

  return (
    <div className="navbar-section">
      <div className="navbar-box">
        <Button color="secondary" onClick={handleAddAgroActivityClick}>
          Agregar Actividad Agropecuaria
        </Button>
        <Button 
          color={isDrawing && drawType === 'length' ? 'warning' : 'secondary'}
          onClick={() => handleDrawButtonClick('length')}
        >
          <i className="fa-solid fa-ruler"></i> Length
        </Button>
        <Button 
          color={isDrawing && drawType === 'area' ? 'warning' : 'secondary'}
          onClick={() => handleDrawButtonClick('area')}
        >
          <i className="fa-solid fa-ruler"></i> Area
        </Button>
        <div className="zoom-buttons">
          <Button color="secondary" onClick={handleZoomIn}>
            <i className="bi bi-zoom-in"></i>
          </Button>
          <Button color="secondary" onClick={handleZoomOut}>
            <i className="bi bi-zoom-out"></i>
          </Button>
        </div>
      </div>
      <AddAgroActivityComponent
        show={showAddAgroActivity}
        handleClose={handleCloseAddAgroActivity}
        map={map}
      />
    </div>
  );
};

export default Navbar;