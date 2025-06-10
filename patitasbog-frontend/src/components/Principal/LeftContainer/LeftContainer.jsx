import React from 'react';
import './LeftContainer.css';

const LeftContainer = () => {
    return (
        <div className="left-container">
            <div className="icono-container">
                <a href="/notifications">
                    <img src='/images/campana.png' className="icono-image" 
                    alt="campana de notificaciones" />                
                </a>
            </div>
            <div className="profile-picture-container">
                <a href="/myprofile">
                    <img src='/images/fotodeperfil.png' className="profile-picture"
                    alt="foto de perfil" />                
                </a>
            </div>
        </div>
    );
};

export default LeftContainer;