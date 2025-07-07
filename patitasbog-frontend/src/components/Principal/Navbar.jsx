import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../styles/Navbar.css';
import { AuthContext } from '../../contexts/AuthContext';

const Navbar = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <Link to="/" className="logo-section">
        <img src="/images/logo.svg" alt="Logo" className="logo-icon" />
        <span className="logo-text">PatitasBog</span>
      </Link>

      <div className="nav-links">
        <Link to="/about">Quiénes Somos</Link>
        <Link to="/educacion">Módulo Educativo</Link>
        {!isAuthenticated && (
          <>
            <Link to="/register">Registrarse</Link>
            <Link to="/login">Iniciar Sesión</Link>
          </>
        )}
        {isAuthenticated && (
          <>
            <Link to="/notificaciones">
              Notificaciones
            </Link>
            <Link to="/perfil">Mi Perfil</Link>
            <button onClick={handleLogout} className="logout-btn">Cerrar Sesión</button>
          </>
        )}
      </div>
    </nav>

  );
};

export default Navbar;
