"use client"

import { useContext, useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import "../../styles/Navbar.css"
import { AuthContext } from "../../contexts/AuthContext"

const Navbar = () => {
  const { isAuthenticated, logout } = useContext(AuthContext)
  const navigate = useNavigate()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate("/")
    setIsMobileMenuOpen(false) // Cerrar menú al hacer logout
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  // Prevenir scroll del body cuando el menú móvil está abierto
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.classList.add("mobile-menu-open")
    } else {
      document.body.classList.remove("mobile-menu-open")
    }

    // Cleanup al desmontar el componente
    return () => {
      document.body.classList.remove("mobile-menu-open")
    }
  }, [isMobileMenuOpen])

  // Cerrar menú al redimensionar la ventana (si se vuelve a desktop)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1280) {
        setIsMobileMenuOpen(false)
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <>
      <nav className="navbar">
        <Link to="/" className="logo-section" onClick={closeMobileMenu}>
          <img src="/images/logo.svg" alt="Logo" className="logo-icon" />
          <span className="logo-text">PatitasBog</span>
        </Link>

        {/* Desktop Navigation */}
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
              <Link to="/notificaciones">Notificaciones</Link>
              <Link to="/perfil">Mi Perfil</Link>
              <button onClick={handleLogout} className="logout-btn">
                Cerrar Sesión
              </button>
            </>
          )}
        </div>

        {/* Hamburger Button */}
        <button
          className={`hamburger-btn ${isMobileMenuOpen ? "open" : ""}`}
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`mobile-menu-overlay ${isMobileMenuOpen ? "open" : ""}`}>
        <div className="mobile-nav-links">
          <Link to="/about" onClick={closeMobileMenu}>
            Quiénes Somos
          </Link>
          <Link to="/educacion" onClick={closeMobileMenu}>
            Módulo Educativo
          </Link>
          {!isAuthenticated && (
            <>
              <Link to="/register" onClick={closeMobileMenu}>
                Registrarse
              </Link>
              <Link to="/login" onClick={closeMobileMenu}>
                Iniciar Sesión
              </Link>
            </>
          )}
          {isAuthenticated && (
            <>
              <Link to="/notificaciones" onClick={closeMobileMenu}>
                Notificaciones
              </Link>
              <Link to="/perfil" onClick={closeMobileMenu}>
                Mi Perfil
              </Link>
              <button onClick={handleLogout} className="logout-btn">
                Cerrar Sesión
              </button>
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default Navbar
