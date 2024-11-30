// NavBar.js
import React from 'react';
import './NavBar.css';

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="/home">Mi Aplicación</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <button className="btn btn-link nav-link" onClick={() => alert('Opción 1')}>Opción 1</button>
          </li>
          <li className="nav-item">
            <button className="btn btn-link nav-link" onClick={() => alert('Opción 2')}>Opción 2</button>
          </li>
          <li className="nav-item">
            <button className="btn btn-link nav-link" onClick={() => alert('Opción 3')}>Opción 3</button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;