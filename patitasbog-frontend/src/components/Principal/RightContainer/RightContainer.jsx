import React, { useState, useEffect } from 'react';
import './RightContainer.css';

const RightContainer = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 768 && isOpen) {
                setIsOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [isOpen]);

    const toggleRightContainer = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <button className="toggle-right-container-button" onClick={toggleRightContainer} 
            aria-label="Abrir/Cerrar menú lateral">
                {isOpen ? 'X' : '☰'}
            </button>

            <div className={`right-container ${isOpen ? 'open' : ''}`}>
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
                                src="/images/moduloeducativo.PNG"
                                alt="Dibujo animado de mujer con dos perritos"
                                className="imagen-previa"
                            />
                        </div>
                    </a>
                </div>
            </div>
        </>
    );
};

export default RightContainer;