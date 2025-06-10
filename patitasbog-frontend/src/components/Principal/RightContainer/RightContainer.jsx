import React from 'react';
import './RightContainer.css';

const RightContainer = ({ children }) => {
    return (
        <div className="right-container">
            <div className="contact" aria-label="Contactos">
                <h2>Contactos</h2>
                <span>Email: servicio@patitasbog.com<br></br></span>
                <span>Tel: 3333333333</span>
            </div>
            <div className="call-to-action">
                <a
                href="/education"
                aria-label="Ingresar al módulo educativo"
                >
                    <h2>Módulo Educativo</h2>
                    <div >
                    <img
                        src="/images/moduloeducativo.png"
                        alt="Dibujo animado de mujer con dos perritos"
                        className="imagen-previa"
                    />
                    </div>
                </a>
            </div>
        </div>
    );
};

export default RightContainer;