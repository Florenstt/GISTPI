import React, { useState } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Input } from 'reactstrap';
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
          {filteredLayers.map((layer, index) => (
            <DropdownItem 
              key={index} 
              onClick={() => onLayerToggle(layer)} 
              className={layer.getVisible() ? 'layer-visible' : ''}
            >
              {layer.get('title')}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

export default Sidebar;