import React, { useState } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import './Sidebar.css';

const Sidebar = ({ layers, onLayerToggle }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen(prevState => !prevState);

  return (
    <div className="sidebar">
      <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
        <DropdownToggle caret>
          Capas
        </DropdownToggle>
        <DropdownMenu className="dropdown-menu-scrollable">
          {layers.map((layer, index) => (
            <DropdownItem key={index} onClick={() => onLayerToggle(layer)}>
              {layer.get('title')}
              {layer.getVisible() ? ' (Visible)' : ''}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

export default Sidebar;