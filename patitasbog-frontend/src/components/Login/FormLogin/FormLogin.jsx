import React, { useState } from 'react';
import PasswordInput from '../PasswordInput/PasswordInput';
import './FormLogin.css';
import { Link, useNavigate } from 'react-router-dom';
import apiService from '../../../services/apiService';

// Formulario de login con integración a la API backend
const FormLogin = ({ onLogin, onFail, onGoogleLogin }) => {
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
          navigate('/dashboard');
        }, 1500);
      }
    } catch (error) {
      console.error('❌ Error de login:', error);
      setErrorMessage(error.message || 'Error al iniciar sesión. Verifica tus credenciales.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container-generic">
      <div className="caja-formulario">
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
          <label className="label-formulario">Contraseña</label>
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
            {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
          </button>
          <div className="separador-o">ó</div>
          {/* Botón para login con Google */}
          <button
            type="button"
            className="button-principal"
            onClick={onGoogleLogin}
          >
            Entrar con Google
          </button>
        </form>
        {/* Enlace para recuperar contraseña como link subrayado */}
        <Link to="/recover_password_request" className="link-recuperar-clave">
          ¿Olvidaste tu contraseña?
        </Link>
        {/* Mensajes de éxito o error */}
        {errorMessage && <div className="mensaje-error">{errorMessage}</div>}
        {successMessage && <div className="mensaje-exito">{successMessage}</div>}
      </div>
    </div>
  );
};

export default FormLogin;