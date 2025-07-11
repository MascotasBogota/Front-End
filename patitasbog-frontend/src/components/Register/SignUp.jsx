"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import apiService from "../../services/apiService"
import styles from "../../styles/SignUp.module.css"

const SignUp = ({ onRegister, onFail }) => {
  const [nombre, setNombre] = useState("")
  const [correo, setCorreo] = useState("")
  const [password, setPassword] = useState("")
  const [confirmarPassword, setConfirmarPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [successMessage, setSuccessMessage] = useState("")
  const [showEmailForm, setShowEmailForm] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  // Validaciones
  const validarCorreo = (correo) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)
  const validarPassword = (password) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/.test(password)

  // Validaciones individuales para mostrar checks
  const validaciones = {
    longitud: password.length >= 6,
    mayuscula: /[A-Z]/.test(password),
    minuscula: /[a-z]/.test(password),
    numero: /\d/.test(password),
    coincide: password === confirmarPassword && password !== "",
  }

  const handleEmailRegister = () => {
    setShowEmailForm(true)
  }

  // Función para manejar el registro con Google
  const handleGoogleRegister = async () => {
    try {
      setIsLoading(true)
      setErrorMessage("")

      if (!window.google) {
        setErrorMessage("Google Sign-In no está disponible. Por favor, recarga la página.")
        setIsLoading(false)
        return
      }

      window.google.accounts.id.initialize({
        client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        callback: handleGoogleCallback,
        auto_select: false,
        cancel_on_tap_outside: true,
      })

      window.google.accounts.id.prompt((notification) => {
        if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
          window.google.accounts.id.renderButton(document.getElementById("google-signin-button"), {
            theme: "outline",
            size: "large",
            width: "100%",
          })
        }
      })
    } catch (error) {
      console.error("Error al inicializar Google Sign-In:", error)
      setErrorMessage("Error al conectar con Google. Inténtalo de nuevo.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleCallback = async (response) => {
    try {
      setIsLoading(true)
      setErrorMessage("")

      const credential = response.credential
      const payload = JSON.parse(atob(credential.split(".")[1]))

      const googleUserData = {
        nombre: payload.name,
        email: payload.email,
        googleId: payload.sub,
        picture: payload.picture,
        provider: "google",
      }

      const backendResponse = await apiService.registerWithGoogle(googleUserData)
      setSuccessMessage("¡Cuenta creada con éxito con Google! Redirigiendo...")

      if (onRegister) {
        onRegister("¡Cuenta creada con éxito!", "Redirigiendo a login...", "/login")
      }
    } catch (error) {
      console.error("Error en registro con Google:", error)
      setErrorMessage("No es posible registrarse con Google: " + (error.message || "Error desconocido"))
      if (onFail) {
        onFail("No es posible registrarse", error.message || "Error desconocido")
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setErrorMessage("")
    setSuccessMessage("")

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

  if (showEmailForm) {
    return (
      <div className={styles.patitasContainer}>
        <div className={styles.patitasLogoSection}>
          <img src="/images/logo2.svg" alt="PatitasBog Logo" width="40" height="48" />
          <h1 className={styles.patitasLogoText}>PatitasBog</h1>
        </div>
        <div className={`${styles.patitasMainCard} ${styles.patitasEmailFormCard}`}>
          <div className={styles.patitasCardContent}>
            <div className={styles.patitasTitleSection}>
              <h2 className={styles.patitasMainTitle}>Registrate</h2>
              <p className={styles.patitasSubtitle}>Hazlo gratis. No se requiere ningún pago</p>
            </div>
            <hr className={styles.patitasDivider} />
            <form onSubmit={handleSubmit} className={styles.patitasEmailForm}>
              {/* Nombre completo */}
              <div className={styles.patitasFormFieldSingle}>
                <label className={styles.patitasFormLabel}>Nombre completo</label>
                <input
                  type="text"
                  className={styles.patitasFormInputSingle}
                  placeholder="Ingresa tu nombre completo"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  required
                />
              </div>
              {/* Correo electrónico */}
              <div className={styles.patitasFormFieldSingle}>
                <label className={styles.patitasFormLabel}>Correo electrónico</label>
                <input
                  type="email"
                  className={styles.patitasFormInputSingle}
                  placeholder="Tu correo electrónico"
                  value={correo}
                  onChange={(e) => setCorreo(e.target.value)}
                  required
                />
              </div>
              {/* Contraseña */}
              <div className={styles.patitasFormFieldSingle}>
                <label className={styles.patitasFormLabel}>Contraseña</label>
                <div className={styles.patitasPasswordContainer}>
                  <input
                    type={showPassword ? "text" : "password"}
                    className={styles.patitasFormInputSingle}
                    placeholder="Escribe una contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className={styles.patitasPasswordToggle}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <img
                      src={showPassword ? "/icons/closed_eye.svg" : "/icons/open_eye.svg"}
                      alt={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                      width="20"
                      height="20"
                    />
                  </button>
                </div>
                {/* Validaciones visuales */}
                <div className={styles.patitasValidationChecks}>
                  <div className={`${styles.patitasValidationItem} ${validaciones.longitud ? styles.valid : ""}`}>
                    <span className={styles.patitasCheckIcon}>{validaciones.longitud ? "✓" : "○"}</span>
                    <span>Incluye 6 caracteres</span>
                  </div>
                  <div className={`${styles.patitasValidationItem} ${validaciones.mayuscula ? styles.valid : ""}`}>
                    <span className={styles.patitasCheckIcon}>{validaciones.mayuscula ? "✓" : "○"}</span>
                    <span>Incluye una mayúscula</span>
                  </div>
                  <div className={`${styles.patitasValidationItem} ${validaciones.minuscula ? styles.valid : ""}`}>
                    <span className={styles.patitasCheckIcon}>{validaciones.minuscula ? "✓" : "○"}</span>
                    <span>Incluye una minúscula</span>
                  </div>
                  <div className={`${styles.patitasValidationItem} ${validaciones.numero ? styles.valid : ""}`}>
                    <span className={styles.patitasCheckIcon}>{validaciones.numero ? "✓" : "○"}</span>
                    <span>Incluye un número</span>
                  </div>
                </div>
              </div>
              {/* Confirmación de contraseña */}
              <div className={styles.patitasFormFieldSingle}>
                <label className={styles.patitasFormLabel}>Confirmación de contraseña</label>
                <div className={styles.patitasPasswordContainer}>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    className={styles.patitasFormInputSingle}
                    placeholder="Confirma tu contraseña"
                    value={confirmarPassword}
                    onChange={(e) => setConfirmarPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className={styles.patitasPasswordToggle}
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    <img
                      src={showConfirmPassword ? "/icons/closed_eye.svg" : "/icons/open_eye.svg"}
                      alt={showConfirmPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                      width="20"
                      height="20"
                    />
                  </button>
                </div>
                {/* Validación de coincidencia */}
                {confirmarPassword && (
                  <div className={`${styles.patitasValidationItem} ${validaciones.coincide ? styles.valid : ""}`}>
                    <span className={styles.patitasCheckIcon}>{validaciones.coincide ? "✓" : "○"}</span>
                    <span>Coincide con la contraseña ingresada</span>
                  </div>
                )}
              </div>
              {errorMessage && <div className={styles.patitasErrorMessage}>{errorMessage}</div>}
              {successMessage && <div className={styles.patitasSuccessMessage}>{successMessage}</div>}
              <button type="submit" className={styles.patitasCreateAccountBtn} disabled={isLoading}>
                {isLoading ? "Creando cuenta..." : "Crear cuenta"}
              </button>
              <div className={styles.oSeparator}>
                <span className={styles.horizontalLine}></span>
                <p className={styles.o}>ó</p>
                <span className={styles.horizontalLine}></span>
              </div>

              <div className={styles.backTextContainer}>
                <span className={styles.backText} onClick={() => setShowEmailForm(false)}>
                  Volver a opciones de registro
                </span>
              </div>
            </form>
            <div className={styles.patitasUniversitySection}>
              <p className={styles.patitasUniversityText}>
                Este es un proyecto realizado en la clase Ingeniería de Software 2, de
                <br />
                la Universidad Nacional de Colombia en el semestre 2025-1
              </p>
            </div>
          </div>
        </div>
        <div className={styles.patitasSigninSection}>
          <p className={styles.patitasSigninText}>
            ¿Ya tienes una cuenta?{" "}
            <Link to="/login" className={styles.patitasSigninLink}>
              Inicia Sesión
            </Link>
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.patitasContainer}>
      <Link to="/" className={styles.patitasLogoSection}>
        <img src="/images/logo2.svg" alt="Logo" className={styles.logoIcon} />
        <span className={styles.logoText}>PatitasBog</span>
      </Link>
      <div className={styles.patitasMainCard}>
        <div className={styles.patitasCardContent}>
          <div className={styles.patitasTitleSection}>
            <h2 className={styles.patitasMainTitle}>Registrate</h2>
            <p className={styles.patitasSubtitle}>Hazlo gratis. No se requiere ningún pago</p>
          </div>
          <hr className={styles.patitasDivider} />
          <div className={styles.patitasButtonsSection}>
            <button
              className={`${styles.patitasButton} ${styles.patitasGoogleButton}`}
              onClick={handleGoogleRegister}
              disabled={isLoading}
            >
              <img src="/icons/google_icon.png" alt="Google" width="22" height="22" className={styles.googleIcon} />
              <span>{isLoading ? "Conectando..." : "Continuar con Google"}</span>
            </button>
            <div id="google-signin-button" style={{ display: "none" }}></div>
            <button className={`${styles.patitasButton} ${styles.patitasEmailButton}`} onClick={handleEmailRegister}>
              <img src="/icons/mail.svg" alt="Email" width="22" height="22" className={styles.patitasMailIcon} />
              <span>Continuar con correo</span>
            </button>
          </div>
          <div className={styles.patitasTermsSection}>
            <p className={styles.patitasTermsText}>
              Al registrarte aceptas los{" "}
              <a href="#" className={styles.patitasTermsLink}>
                Términos
              </a>{" "}
              y las{" "}
              <a href="#" className={styles.patitasTermsLink}>
                Políticas de Privacidad
              </a>
            </p>
          </div>
          <div className={styles.patitasUniversitySection}>
            <p className={styles.patitasUniversityText}>
              Este es un proyecto realizado en la clase Ingeniería de Software 2, de
              <br />
              la Universidad Nacional de Colombia en el semestre 2025-1
            </p>
          </div>
        </div>
      </div>
      <div className={styles.patitasSigninSection}>
        <p className={styles.patitasSigninText}>
          ¿Ya tienes una cuenta?{" "}
          <Link to="/login" className={styles.patitasSigninLink}>
            Inicia Sesión
          </Link>
        </p>
      </div>
    </div>
  )
}

export default SignUp
