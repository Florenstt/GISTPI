// Navbar.js
import React from 'react';
import { Dropdown } from 'react-bootstrap';
import ScaleBarControl from './ScaleBarControl'; // Asegúrate de que la ruta sea correcta
import DrawComponent from './DrawComponent'; // Asegúrate de que la ruta sea correcta

const Navbar = ({ map, isDrawing, onDrawButtonClick, onClearDrawings }) => {
  const handleDrawButtonClick = () => {
    if (isDrawing) {
      onClearDrawings();
    }
    onDrawButtonClick();
  };

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
          <li className="nav-item dropdown">
            <Dropdown>
              <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                Medir
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={handleDrawButtonClick}>
                  {isDrawing ? 'Stop Drawing' : 'Start Drawing'}
                </Dropdown.Item>
                {map && isDrawing && <DrawComponent map={map} />}
              </Dropdown.Menu>
            </Dropdown>
          </li>
          <li className="nav-item dropdown">
            <Dropdown>
              <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                Escala
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <ScaleBarControl map={map} />
              </Dropdown.Menu>
            </Dropdown>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;