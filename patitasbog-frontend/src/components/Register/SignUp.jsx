"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
//import PasswordInput from "../Login/PasswordInput"
import apiService from "../../services/apiService"
import "../../styles/SignUp.css"

const SignUp = ({ onRegister, onFail }) => {
  const [nombre, setNombre] = useState("")
  const [correo, setCorreo] = useState("")
  const [password, setPassword] = useState("")
  const [confirmarPassword, setConfirmarPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [successMessage, setSuccessMessage] = useState("")
  const [showEmailForm, setShowEmailForm] = useState(false)

  // Validaciones
  const validarCorreo = (correo) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)

  const validarPassword = (password) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/.test(password)

  const handleEmailRegister = () => {
    setShowEmailForm(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setErrorMessage("")
    setSuccessMessage("")

    // Validaciones con mensajes personalizados
    if (!nombre || !correo || !password || !confirmarPassword) {
      setErrorMessage("No es posible registrarse porque... Algún campo está vacío")
      setIsLoading(false)
      if (onFail) onFail("No es posible registrarse", "Algún campo está vacío")
      return
    }

    if (!validarCorreo(correo)) {
      setErrorMessage("No es posible registrarse porque... El correo no tiene un formato válido")
      setIsLoading(false)
      if (onFail) onFail("No es posible registrarse", "El correo no tiene un formato válido")
      return
    }

    if (!validarPassword(password)) {
      setErrorMessage("No es posible registrarse porque... La contraseña no cumple los estándares")
      setIsLoading(false)
      if (onFail) onFail("No es posible registrarse", "La contraseña no cumple los estándares")
      return
    }

    if (password !== confirmarPassword) {
      setErrorMessage("No es posible registrarse porque... La confirmación no coincide con la contraseña")
      setIsLoading(false)
      if (onFail) onFail("No es posible registrarse", "La confirmación no coincide con la contraseña")
      return
    }

    try {
      const userData = {
        nombre,
        email: correo,
        password,
      }

      const response = await apiService.register(userData)
      setSuccessMessage("¡Cuenta creada con éxito! Redirigiendo a login...")

      if (onRegister) {
        onRegister("¡Cuenta creada con éxito!", "Redirigiendo a login...", "/login")
      }
    } catch (error) {
      setErrorMessage("No es posible registrarse porque... " + (error.message || "Error desconocido"))
      if (onFail) {
        onFail("No es posible registrarse", error.message || "Error desconocido")
      }
    } finally {
      setIsLoading(false)
    }
  }

  // Componentes SVG (mantener los mismos)
  const PawPrintLogo = () => (
    <svg width="40" height="48" viewBox="0 0 40 48" fill="none">
      {/* Location pin shape */}
      <path d="M20 0C12.268 0 6 6.268 6 14c0 10.5 14 34 14 34s14-23.5 14-34c0-7.732-6.268-14-14-14z" fill="#937315" />
      {/* Paw print */}
      <g transform="translate(12, 8)">
        {/* Main pad */}
        <ellipse cx="8" cy="12" rx="4" ry="3" fill="#f0ca99" />
        {/* Toe pads */}
        <ellipse cx="4" cy="6" rx="2" ry="2.5" fill="#f0ca99" />
        <ellipse cx="8" cy="4" rx="2" ry="2.5" fill="#f0ca99" />
        <ellipse cx="12" cy="6" rx="2" ry="2.5" fill="#f0ca99" />
        <ellipse cx="8" cy="8" rx="1.5" ry="2" fill="#f0ca99" />
      </g>
    </svg>
  )

  const GoogleLogo = () => (
    <svg width="18" height="18" viewBox="0 0 18 18">
      <path
        fill="#4285F4"
        d="M16.51 8H8.98v3h4.3c-.18 1-.74 1.48-1.6 2.04v2.01h2.6a7.8 7.8 0 0 0 2.38-5.88c0-.57-.05-.66-.15-1.18z"
      />
      <path
        fill="#34A853"
        d="M8.98 17c2.16 0 3.97-.72 5.3-1.94l-2.6-2.04a4.8 4.8 0 0 1-2.7.75 4.8 4.8 0 0 1-4.52-3.26H1.83v2.07A8 8 0 0 0 8.98 17z"
      />
      <path
        fill="#FBBC05"
        d="M4.46 10.51a4.8 4.8 0 0 1-.25-1.51c0-.52.09-1.03.25-1.51V5.42H1.83a8 8 0 0 0 0 7.16l2.63-2.07z"
      />
      <path
        fill="#EA4335"
        d="M8.98 3.58c1.32 0 2.5.45 3.44 1.35l2.54-2.54A8 8 0 0 0 8.98 1a8 8 0 0 0-7.15 4.42l2.63 2.07c.61-1.86 2.35-3.26 4.52-3.26z"
      />
    </svg>
  )

  const MailIcon = () => (
    <svg className="patitas-mail-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
      />
    </svg>
  )

  if (showEmailForm) {
    return (
      <div className="patitas-container">
        <div className="patitas-logo-section">
          <PawPrintLogo />
          <h1 className="patitas-logo-text">PatitasBog</h1>
        </div>

        <div className="patitas-main-card patitas-email-form-card">
          <div className="patitas-card-content">
            <div className="patitas-title-section">
              <h2 className="patitas-main-title">Registro</h2>
              <p className="patitas-subtitle">Hazlo gratis. No se requiere ningún pago</p>
            </div>

            <hr className="patitas-divider" />

            <form onSubmit={handleSubmit} className="patitas-email-form">
              <div className="patitas-form-row">
                <div className="patitas-form-field">
                  <label className="patitas-form-label">Nombre</label>
                  <input
                    type="text"
                    className="patitas-form-input"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    required
                  />
                </div>
                <div className="patitas-form-field">
                  <label className="patitas-form-label">Correo</label>
                  <input
                    type="email"
                    className="patitas-form-input"
                    value={correo}
                    onChange={(e) => setCorreo(e.target.value)}
                    required
                  />
                  <span className="patitas-form-help">Ingrese un correo electrónico válido</span>
                </div>
              </div>

              <div className="patitas-form-row">
                <div className="patitas-form-field">
                  <label className="patitas-form-label">Contraseña</label>
                  <PasswordInput
                    label=""
                    id="registerPassword"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <span className="patitas-form-help">
                    La contraseña debe tener al menos 6 caracteres e incluir una minúscula, mayúscula y un número
                  </span>
                </div>
                <div className="patitas-form-field">
                  <label className="patitas-form-label">Confirmar Contraseña</label>
                  <PasswordInput
                    label=""
                    id="confirmPassword"
                    value={confirmarPassword}
                    onChange={(e) => setConfirmarPassword(e.target.value)}
                    required
                  />
                  <span className="patitas-form-help">
                    La confirmación de contraseña debe coincidir con la contraseña ingresada
                  </span>
                </div>
              </div>

              {errorMessage && <div className="patitas-error-message">{errorMessage}</div>}
              {successMessage && <div className="patitas-success-message">{successMessage}</div>}

              <button type="submit" className="patitas-button patitas-email-button" disabled={isLoading}>
                {isLoading ? "Registrando..." : "Registrarse"}
              </button>

              <button
                type="button"
                className="patitas-button patitas-google-button"
                onClick={() => setShowEmailForm(false)}
              >
                ← Volver
              </button>
            </form>

            <div className="patitas-terms-section">
              <p className="patitas-terms-text">
                Al registrarte aceptas los{" "}
                <a href="#" className="patitas-terms-link">
                  Términos
                </a>{" "}
                y las{" "}
                <a href="#" className="patitas-terms-link">
                  Políticas de Privacidad
                </a>
              </p>
            </div>

            <div className="patitas-university-section">
              <p className="patitas-university-text">
                Este es un proyecto realizado en la clase Ingeniería de Software 2, de
                <br />
                la Universidad Nacional de Colombia en el semestre 2025-1
              </p>
            </div>
          </div>
        </div>

        <div className="patitas-signin-section">
          <p className="patitas-signin-text">
            ¿Ya tienes una cuenta?{" "}
            <Link to="/login" className="patitas-signin-link">
              Inicia Sesión
            </Link>
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="patitas-container">
      <div className="patitas-logo-section">
        <PawPrintLogo />
        <h1 className="patitas-logo-text">PatitasBog</h1>
      </div>

      <div className="patitas-main-card">
        <div className="patitas-card-content">
          <div className="patitas-title-section">
            <h2 className="patitas-main-title">Registrate</h2>
            <p className="patitas-subtitle">Hazlo gratis. No se requiere ningún pago</p>
          </div>

          <hr className="patitas-divider" />

          <div className="patitas-buttons-section">
            <button className="patitas-button patitas-google-button">
              <GoogleLogo />
              <span>Continuar con Google</span>
            </button>

            <button className="patitas-button patitas-email-button" onClick={handleEmailRegister}>
              <MailIcon />
              <span>Continuar con correo</span>
            </button>
          </div>

          <div className="patitas-terms-section">
            <p className="patitas-terms-text">
              Al registrarte aceptas los{" "}
              <a href="#" className="patitas-terms-link">
                Términos
              </a>{" "}
              y las{" "}
              <a href="#" className="patitas-terms-link">
                Políticas de Privacidad
              </a>
            </p>
          </div>

          <div className="patitas-university-section">
            <p className="patitas-university-text">
              Este es un proyecto realizado en la clase Ingeniería de Software 2, de
              <br />
              la Universidad Nacional de Colombia en el semestre 2025-1
            </p>
          </div>
        </div>
      </div>

      <div className="patitas-signin-section">
        <p className="patitas-signin-text">
          ¿Ya tienes una cuenta?{" "}
          <Link to="/login" className="patitas-signin-link">
            Inicia Sesión
          </Link>
        </p>
      </div>
    </div>
  )
}

export default SignUp
