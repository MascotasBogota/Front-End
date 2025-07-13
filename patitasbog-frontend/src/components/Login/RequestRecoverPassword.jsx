import React, { useContext, useState, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import styles from '../../styles/RecoverPassword.module.css';
import { useGoogleLogin } from '@react-oauth/google';
import { userService } from '../../services/userService';
import { validarCorreo } from '../../utils/usuariosUtils.js';

const RequestRecoverPassword = ({ handleShowForm }) => {
    const [correo, setCorreo] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        setTimeout(() => {
            handleShowForm();
        }, 1500);
    }

    return (
        <div className={styles.formBox}>
            <div className={styles.formHeader}>
                <p className={styles.formTitle}>
                   Reestablece tu contraseña</p>
            </div>
            <div className={styles.formLoginBody}>
                <form onSubmit={handleSubmit}>
                    <label className={styles.inputLabel}>
                    Correo electrónico
                    </label>
                    <input 
                        className={styles.formInputEmail}
                        type="email"
                        required
                    />
                    <button className={styles.sendRequestButton}
                        disabled={isLoading}
                    >
                        {isLoading && !successMessage ? 'Enviando código...' : 'Enviar código de reestablecimiento'}
                    </button>
                </form>
            </div>    
            {errorMessage && <div className={styles.mensaje_error}>{errorMessage}</div>}
            {successMessage && <div className={styles.mensaje_exito}>{successMessage}</div>}
        </div>
    );
};

export default RequestRecoverPassword;