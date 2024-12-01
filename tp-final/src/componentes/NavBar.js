// Navbar.js
import React from 'react';
import { Dropdown } from 'react-bootstrap';
import ScaleBarControl from './ScaleBarControl'; // Asegúrate de que la ruta sea correcta

const Navbar = ({ map, onDrawButtonClick }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="#">Navbar</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link" href="#">Home</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">Features</a>
          </li>
          <li className="nav-item">
            <button className="nav-link btn" onClick={onDrawButtonClick}>Button 3</button>
          </li>
          <li className="nav-item dropdown">
            <Dropdown>
              <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                Scale Bar
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {map && <ScaleBarControl map={map} />}
              </Dropdown.Menu>
            </Dropdown>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;