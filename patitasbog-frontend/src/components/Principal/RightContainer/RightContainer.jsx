import React, { useState, useEffect } from 'react'; 
import { useLocation } from 'react-router-dom';
import './RightContainer.css';

const RightContainer = ({ children }) => {
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);
    const [isLogued, setIsLogued] = useState(true);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 768 && isOpen) {
                setIsOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [isOpen]);

    useEffect(() => {
            if(location.pathname=='/login' || location.pathname=='/register'
               || location.pathname=='/recover_password_request'
                || location.pathname=='/change_password'){
                setIsLogued(false);
            }
            else{
                setIsLogued(true);
            }
        }, [location.pathname]);

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
                
                {isLogued &&
                    <div className="create-report-redirect">
                        <a href="/create_lost" aria-label="Crear nuevo reporte" className="report-link">
                            <img
                                src="/images/lapiz_icono.png"
                                alt="Ícono de lápiz"
                                className="imagen-previa"
                            />
                            <h2>Nuevo Reporte</h2>
                        </a>
                    </div>
                }
            </div>
        </>
    );
};

export default RightContainer;