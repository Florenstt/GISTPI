// Navbar.js
import React from 'react';

const Navbar = () => {
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
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;