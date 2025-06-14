import React, { useState } from 'react'; // Keep useState
import './FormCambiarClave.css';
import PasswordInput from '../PasswordInput/PasswordInput';

const FormCambiarClave = ({ onChangeSuccess, onChangeFail }) => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [codeConfirmation, setCodeConfirmation] = useState('');

    const validateForm = () => {
        let currentErrors = []; 
        let isValid = true;   

        if (password.length < 6) {
            currentErrors.push('La contraseña debe tener al menos 6 caracteres.');
            isValid = false;
        }
        if (password !== confirmPassword) {
            currentErrors.push('La contraseña y su confirmación no coinciden.');
            isValid = false;
        }
        if (password === '' || confirmPassword === '' || codeConfirmation === '') {
            currentErrors.push('Todos los campos son obligatorios.');
            isValid = false;
        }
        if (codeConfirmation !== '12345') { 
            currentErrors.push('El código de confirmación no coincide.');
            isValid = false;
        }
        return { isValid, errors: currentErrors.join('\n') };
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { isValid, errors } = validateForm();

        if (isValid) {
            setTimeout(() => {
                onChangeSuccess(
                    '¡Contraseña cambiada correctamente!',
                    'login',
                    'login'
                );
            }, 500); 
        }
        else {
            setTimeout(() => {
                onChangeFail(
                    '¡Error al cambiar la contraseña!',
                    errors
                );
            }, 500); 
        }
    };

    return (
        <div className='caja-formulario'>
            <h1>Reestablecer Contraseña</h1>
            <form onSubmit={handleSubmit}>
                <PasswordInput
                    label="Nueva Contraseña:"
                    id="newPassword"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    name="newPassword"
                    required
                />
                <p className='behind-input'>*La contraseña debe  tener mínimo 8 caracteres que 
                    incluyan mayúsculas, minúsculas, letras, números y símbolos especiales </p>
                <PasswordInput
                    label="Confirmar Contraseña:"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    name="confirmPassword"
                    required
                />
                <p className='behind-input'>*La confirmación de contraseña debe coincidir con
                    la nueva contraseña </p>
                <label>Código de confirmación</label>
                <input
                    type="text"
                    value={codeConfirmation}
                    onChange={(e) => setCodeConfirmation(e.target.value)}
                />
                <p className='behind-input'>*El código debe coincidir con el código enviado
                    al correo </p>
                <button type="submit" className="button-principal">Enviar</button>
            </form>
        </div>
    );
};

export default FormCambiarClave;