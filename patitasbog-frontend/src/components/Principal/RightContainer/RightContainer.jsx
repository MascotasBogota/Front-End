import React from 'react';
import './RightContainer.css';

const RightContainer = ({ children }) => {
    return (
        <div className="right-container">
            <div className="contact">
                <h2>Contactos</h2>
                <span>Email: servicio@patitasbog.com<br></br></span>
                <span>Tel: 3333333333</span>
            </div>
            <div className="call-to-action">
                <h2>Módulo Educativo</h2>
                <div className="image-container">
                    <a
                    href="/education"
                    className="image-link"
                    aria-label="Registrarse en la aplicación"
                    >
                        <img
                            src="/images/moduloeducativo.PNG"
                            alt="Acceso al módulo educativo"
                            className="imagen-previa"
                        />
                    </a>
                </div>
            </div>
        </div>
    );
};

export default RightContainer;