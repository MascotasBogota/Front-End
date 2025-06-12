import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Navbar.css'; 

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // [keynes] Detecta si el usuario está en /home para mostrar "Cerrar sesión"
  const isLoggedIn = location.pathname === '/home';

  // [keynes] Maneja el cierre de sesión y redirige al home principal
  const handleLogout = () => {
    // [keynes] Aquí podrías limpiar el estado de autenticación si lo tienes
    navigate('/'); // [keynes] Redirige al home principal
  };

  return (
    <nav className="navbar" role="navigation" aria-label="Barra de navegación principal">
      <a
        href="/"
        className="logo-link"
        aria-label="Redirección a página de inicio"
      >
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
      </a>
      
      <div className="nav-links">
        <a
          href="/register"
          className="link-register"
          aria-label="Registrarse en la aplicación"
        >
          Regístrate
        </a>
        {isLoggedIn ? (
          // [keynes] Muestra "Cerrar sesión" si está logueado
          <button
            className="btn-login"
            role="button"
            aria-label="Cerrar sesión"
            onClick={handleLogout}
          >
            Cerrar sesión
          </button>
        ) : (
          // [keynes] Muestra "Iniciar sesión" si no está logueado
          <a
            href="/login"
            className="btn-login"
            role="button"
            aria-label="Ir a la página de inicio de sesión"
          >
            Iniciar sesión
          </a>
        )}
      </div>
    </nav>
  );
};

export default Navbar;