// Navbar.js
import React from 'react';
import { Dropdown } from 'react-bootstrap';
import ScaleBarControl from './ScaleBarControl'; // Asegúrate de que la ruta sea correcta

const Navbar = ({ map }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <a className="navbar-brand" href="#">MiMapa</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link" href="#">Botón 1</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">Botón 2</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">Botón 3</a>
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