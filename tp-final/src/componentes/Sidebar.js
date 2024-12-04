import React, { useState } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Input } from 'reactstrap';
import './Sidebar.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const Sidebar = ({ layers, onLayerToggle }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const toggleDropdown = () => setDropdownOpen(prevState => !prevState);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredLayers = layers.filter(layer => 
    layer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
          <div className="dropdown-search">
            <Input
              type="text"
              placeholder="Buscar capas..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
          {filteredLayers.map((layer, index) => (
            <DropdownItem 
              key={index} 
              onClick={() => onLayerToggle(layer)}
            >
              {layer.name}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

export default Sidebar;