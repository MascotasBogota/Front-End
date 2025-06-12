import React, { useState } from 'react';
import PasswordInput from '../PasswordInput/PasswordInput';
import './FormLogin.css';
import { Link } from 'react-router-dom';

// Formulario de login con campos controlados y botones estilizados
const FormLogin = ({ onLogin, onFail, onGoogleLogin }) => {
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');

  // Lista simulada de usuarios registrados
  const usuarios = [
    { correo: 'usuario1@ejemplo.com', password: '123456' },
    { correo: 'usuario2@ejemplo.com', password: 'abcdef' }
  ];

  // Maneja el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    const usuarioValido = usuarios.find(
      (u) => u.correo === correo && u.password === password
    );
    if (usuarioValido) {
      if (onLogin)
        onLogin(
          '¡Exitoso!',
          'Entrando en la aplicación...',
          '/home' // <--- Redirige a HomeLogin.jsx
        );
    } else {
      if (onFail)
        onFail(
          'Error',
          'Las credenciales ingresadas no son válidas. Verifica que el correo y la contraseña estén bien escritos'
        );
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
          />
          {/* Botón de iniciar sesión */}
          <button type="submit" className="button-principal">
            Iniciar Sesión
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
      </div>
    </div>
  );
};

export default FormLogin;