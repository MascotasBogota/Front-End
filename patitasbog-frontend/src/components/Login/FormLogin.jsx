import React, { useState, useEffect } from 'react';
import styles from '../../styles/Login.module.css';
import { reportService } from '../../services/reportService';

const FormLogin = () => {

    return (
        <div className={styles.formBox}>
            <div className={styles.formHeader}>
                <p className={styles.formTitle}>
                   Inicia Sesión</p>
                <p className={styles.registerRedirectText}>
                   ¿No tienes una cuenta?{' '}
                    <a href="/register" className={styles.registerRedirectLink}>
                        Crea una
                    </a>
                </p>
            </div>
            <div className={styles.formLoginBody}>
                <form>
                    <label className={styles.inputLabel}>
                    Correo electrónico
                    </label>
                    <input 
                        className={styles.formInput}
                        type="email"
                        required
                    />
                    <label className={styles.inputLabel}>
                        Contraseña
                    </label>
                    <input 
                        className={styles.formInput}
                        type="email"
                        required
                    />
                    <a 
                        href="/recover-password"
                        className={styles.recoverPasswordRedirect}
                    >
                        ¿Olvidaste tu contraseña?
                    </a>
                    <br />
                    <button className={styles.loginButton}>Iniciar Sesión</button>
                </form>
                <div className={styles.oSeparator}>
                    <span className={styles.horizontalLine}></span>
                    <p className={styles.o}>ó</p>
                    <span className={styles.horizontalLine}></span>
                </div>
                <span className={styles.openauthButton}>
                    <img 
                        src="icons/google_icon.png"
                        className={styles.googleIcon}
                        alt="Google icon"
                    />
                    <p className={styles.openauthText}>Iniciar sesión con Google</p>
                </span>
            </div>    
        </div>
    );
};

export default FormLogin;
