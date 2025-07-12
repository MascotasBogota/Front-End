import { useState } from "react"
import styles from "../../styles/SignUp.module.css"
import apiService from "../../services/apiService"

const SignUpOptions = ({ handleShowEmailForm }) => {
    
    const [isLoading, setIsLoading] = useState(false)
    const [googleError, setGoogleError] = useState("")

    // Función para manejar el registro con Google
    const handleGoogleCallback = async (response) => {
        try {
            setIsLoading(true)
            setGoogleError("")

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
            setGoogleError("No es posible registrarse con Google: " + (error.message || "Error desconocido"))
            if (onFail) {
                onFail("No es posible registrarse", error.message || "Error desconocido")
            }
        } finally {
            setIsLoading(false)
        }
    }

    const handleGoogleRegister = async () => {
        try {
            setIsLoading(true)
            setGoogleError("")

            if (!window.google) {
                setGoogleError("Google Sign-In no está disponible. Por favor, recarga la página.")
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
            setGoogleError("Error al conectar con Google. Inténtalo de nuevo.")
        } finally {
            setIsLoading(false)
        }
    }

    return(
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
                        <span className={styles.fullText}>{isLoading ? "Conectando..." : "Continuar con Google"}</span>
                        <span className={styles.shortText}>Google</span>
                    </button>
                    <div id="google-signin-button" style={{ display: "none" }}></div>
                    <button className={`${styles.patitasButton} ${styles.patitasEmailButton}`} onClick={handleShowEmailForm}>
                        <img src="/icons/mail.svg" alt="Email" width="22" height="22" className={styles.patitasMailIcon} />
                        <span className={styles.fullText}>Continuar con correo</span>
                        <span className={styles.shortText}>Correo</span>
                    </button>
                </div>
                {googleError && <div className={styles.patitasErrorMessage}>{googleError}</div>}
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
  )
}

export default SignUpOptions

