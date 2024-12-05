// NavBar.js
import React, { useState } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Button } from 'reactstrap';
import AddAgroActivityComponent from './AddAgroActivityComponent'; // Importa el componente
import SearchLayerByName from './SearchLayerByName'; // Importa el nuevo componente
import './NavBar.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const NavBar = ({ map, isDrawing, onDrawButtonClick, onClearLengthMeasurements, onClearAreaMeasurements, drawType, setDrawType, layers }) => {
  const [showAddAgroActivity, setShowAddAgroActivity] = useState(false); // Estado para controlar la visibilidad del modal
  const [isDrawingPoint, setIsDrawingPoint] = useState(false); // Estado para controlar si se está dibujando un punto
  const [coordinates, setCoordinates] = useState(null);
  const [showSearchLayerByName, setShowSearchLayerByName] = useState(false); // Estado para controlar la visibilidad del nuevo componente
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen(prevState => !prevState);

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
    setIsDrawingPoint(true);
  };

  const handlePointDrawn = (coords) => {
    setCoordinates(coords);
    setIsDrawingPoint(false);
    setShowAddAgroActivity(true);
  };

  const handleCloseAddAgroActivity = () => {
    setShowAddAgroActivity(false);
    setCoordinates(null);
  };

  const handleSearchAgroActivitiesClick = () => {
    setShowSearchLayerByName(true);
  };

  const handleCloseSearchLayerByName = () => {
    setShowSearchLayerByName(false);
  };

  return (
    <div className="navbar-dropdown">
      <Dropdown isOpen={dropdownOpen} toggle={toggle}>
        <DropdownToggle caret>
          Menu
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem header>Map Controls</DropdownItem>
          <DropdownItem onClick={handleZoomIn}>
            Zoom In
          </DropdownItem>
          <DropdownItem onClick={handleZoomOut}>
            Zoom Out
          </DropdownItem>
          <DropdownItem divider />
          <DropdownItem onClick={() => handleDrawButtonClick('length')}>
            Measure Length
          </DropdownItem>
          <DropdownItem onClick={() => handleDrawButtonClick('area')}>
            Measure Area
          </DropdownItem>
          <DropdownItem divider />
          <DropdownItem onClick={handleAddAgroActivityClick}>
            Add Agro Activity
          </DropdownItem>
          <DropdownItem onClick={handleSearchAgroActivitiesClick}>
            Search Agro Activities
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <AddAgroActivityComponent
        show={showAddAgroActivity}
        handleClose={handleCloseAddAgroActivity}
        map={map}
        onPointDrawn={handlePointDrawn}
        isDrawingPoint={isDrawingPoint}
      />
      <SearchLayerByName
        show={showSearchLayerByName}
        handleClose={handleCloseSearchLayerByName}
        map={map}
        layers={layers} // Pasa las capas al componente
      />
    </div>
  );
};

export default NavBar;