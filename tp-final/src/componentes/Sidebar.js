import React, { useState } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import './Sidebar.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const Sidebar = ({ layers, onLayerToggle }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen(prevState => !prevState);

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
          {layers.map((layer, index) => (
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