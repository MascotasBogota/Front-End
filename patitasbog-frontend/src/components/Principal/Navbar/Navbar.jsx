import React from 'react';
import './Navbar.css'; 

const Navbar =() => {
  return (
    <nav className="navbar" role="navigation" aria-label="Barra de navegación principal">
      {/*Sección del logo y texto "PatitasBog"*/}
      <div className="logo-section">
        <div className="logo-container">
          <img
            src="/images/logo.png"
            alt="Logo de PatitasBog"
            className="logo"
          />
        </div>
        <span className="logo-text">PatitasBog</span>
      </div>

      {/* Agrupación de enlaces de la derecha */}
      <div className="nav-links">
        <a
          href="/register"
          className="link-register"
          aria-label="Registrarse en la aplicación"
        >
          Regístrate
        </a>
        <a
          href="/login"
          className="btn-login"
          role="button"
          aria-label="Ir a la página de inicio de sesión"
        >
          Iniciar sesión
        </a>
      </div>
    </nav>
  );
}

export default Navbar;