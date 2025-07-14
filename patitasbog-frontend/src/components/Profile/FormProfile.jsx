import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from '../../styles/Profile.module.css';

const FormProfile = () => {
  return (
    <div className={styles.form_container}>
        <p className={styles.title}>Mi Perfil</p>
        <form className={styles.form}>
            <div className={styles.options_column}>
                <img src='/images/sin_foto_perfil.png'
                    className={styles.foto_perfil}
                ></img>
                <button type="button" className={styles.options_button}>Subir foto de perfil</button>
                <button type="submit" className={styles.options_button}>Guardar cambios</button>
                <Link to="/change_password" className={styles.options_button2}>Cambiar contraseña</Link>
            </div>
            <div className={styles.fields_column}>
                <label className={styles.firstinputLabel}>Nombre completo</label>
                <input className={styles.formInput}></input>
                <label className={styles.inputLabel}>Correo electrónico</label>
                <input className={styles.formInput}></input>
                <label className={styles.inputLabel}>Usuario</label>
                <input className={styles.formInput}></input>
                <label className={styles.inputLabel}>Sexo</label>
                <input className={styles.formInput}></input>
                <label className={styles.inputLabel}>Dirección</label>
                <input className={styles.formInput}></input>
                <label className={styles.inputLabel}>Número de teléfono</label>
                <input className={styles.formInput}></input>
            </div>
        </form>
    </div>
  );
};

export default FormProfile;