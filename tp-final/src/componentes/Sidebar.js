import React, { useState } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Input } from 'reactstrap';
import { FaMapMarkerAlt, FaDrawPolygon, FaRoad } from 'react-icons/fa';
import './Sidebar.css';

const Sidebar = ({ layers, onLayerToggle }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const toggleDropdown = () => setDropdownOpen(prevState => !prevState);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredLayers = layers
    .filter(layer => layer.get('title').toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => b.getVisible() - a.getVisible()); // Ordenar capas visibles primero

  if (!Array.isArray(layers)) {
    return null;
  }

  const pointLayers = filteredLayers.filter(layer => layer.get('geometryType') === 'Point');
  const lineLayers = filteredLayers.filter(layer => layer.get('geometryType') === 'LineString');
  const polygonLayers = filteredLayers.filter(layer => layer.get('geometryType') === 'Polygon');

  return (
    <div className="sidebar">
      <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
        <DropdownToggle caret>
          <i className="bi bi-stack"></i> Capas
        </DropdownToggle>
        <DropdownMenu className="dropdown-menu-scrollable">
          <Input
            type="text"
            placeholder="Buscar capas..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-input"
          />
          <div className="layer-category">
            <h5><FaMapMarkerAlt /> Puntos</h5>
            {pointLayers.map((layer, index) => (
              <DropdownItem 
                key={index} 
                onClick={() => onLayerToggle(layer)} 
                className={layer.getVisible() ? 'layer-visible' : ''}
              >
                {layer.get('title')}
              </DropdownItem>
            ))}
          </div>
          <div className="layer-category">
            <h5><FaRoad /> Líneas</h5>
            {lineLayers.map((layer, index) => (
              <DropdownItem 
                key={index} 
                onClick={() => onLayerToggle(layer)} 
                className={layer.getVisible() ? 'layer-visible' : ''}
              >
                {layer.get('title')}
              </DropdownItem>
            ))}
          </div>
          <div className="layer-category">
            <h5><FaDrawPolygon /> Polígonos</h5>
            {polygonLayers.map((layer, index) => (
              <DropdownItem 
                key={index} 
                onClick={() => onLayerToggle(layer)} 
                className={layer.getVisible() ? 'layer-visible' : ''}
              >
                {layer.get('title')}
              </DropdownItem>
            ))}
          </div>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

export default Sidebar;