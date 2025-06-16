import React, { useState } from 'react';
import PasswordInput from './PasswordInput';
import '../../styles/FormsLogin.css';
import { Link, useNavigate } from 'react-router-dom';
import apiService from '../../services/apiService';
import { GoogleLogin } from '@react-oauth/google'; // Import GoogleLogin

// Formulario de login con integración a la API backend
const FormLogin = ({ onLogin, onFail }) => { // Removed onGoogleLogin from props as it's handled internally now
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  // Maneja el envío del formulario con API real
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      // CORREGIDO: Enviar email en lugar de username
      const credentials = {
        email: correo, // El campo se llama username en el form pero enviamos como email
        password
      };

      console.log('🔐 Intentando login con:', { 
        email: credentials.email, 
        password: '***' 
      });

      // Llamar a la API de login
      const response = await apiService.login(credentials);
      
      console.log('✅ Login response:', response);
      
      if (response.token) {
        // Guardar token y datos del usuario
        apiService.saveToken(response.token);
        localStorage.setItem('userProfile', JSON.stringify(response.user));
        
        setSuccessMessage('¡Login exitoso! Redirigiendo...');
        
        // Redirigir después de un breve delay
        setTimeout(() => {
          navigate('/home'); // Changed from /dashboard to /home
        }, 1500);
      }
    } catch (error) {
      console.error('❌ Error de login:', error);
      setErrorMessage(error.message || 'Error al iniciar sesión. Verifica tus credenciales.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLoginSuccess = async (credentialResponse) => {
    setIsLoading(true);
    setErrorMessage('');
    setSuccessMessage('');
    console.log('🔑 Google credentialResponse:', credentialResponse);
    try {
      // Send the ID token to your backend
      const response = await apiService.googleLogin({ token: credentialResponse.credential });
      console.log('✅ Google Login response:', response);

      if (response.token) {
        apiService.saveToken(response.token);
        localStorage.setItem('userProfile', JSON.stringify(response.user));
        setSuccessMessage('¡Login con Google exitoso! Redirigiendo...');
        setTimeout(() => {
          navigate('/home'); // Changed from /dashboard to /home
        }, 1500);
      }
    } catch (error) {
      console.error('❌ Error de login con Google:', error);
      setErrorMessage(error.message || 'Error al iniciar sesión con Google.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLoginError = () => {
    console.error('❌ Google Login Failed');
    setErrorMessage('Error al iniciar sesión con Google. Inténtalo de nuevo.');
  };

  return (
    <div className="container-modulo-login">
      <form onSubmit={handleSubmit}>
        {/* Campo de correo */}
        <label className="label-formulario">Correo</label>
        <input
          type="email"
          className="input-formulario"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          required
        />
        {/* Campo de contraseña */}
      <label className="label-formulario-login">Contraseña</label>
        <PasswordInput
          label=""
          id="loginPassword"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />          {/* Botón de iniciar sesión */}
        <button 
          type="submit" 
          className="button-principal"
          disabled={isLoading}
        >
          {isLoading && !successMessage ? 'Iniciando sesión...' : 'Iniciar Sesión'}
        </button>
        <div className="separador-o-login">ó</div>
        {/* Botón para login con Google */}
        <div className="google-login-button-container">
          <GoogleLogin
            onSuccess={handleGoogleLoginSuccess}
            onError={handleGoogleLoginError}
            useOneTap
          />
        </div>
        </form>
      {/* Enlace para recuperar contraseña como link subrayado */}
      <Link to="/recover_password_request" className="link-recuperar-clave">
        ¿Olvidaste tu contraseña?
      </Link>
      {/* Mensajes de éxito o error */}
      {errorMessage && <div className="mensaje-error">{errorMessage}</div>}
      {successMessage && <div className="mensaje-exito">{successMessage}</div>}
    </div>
  );
};

export default FormLogin;