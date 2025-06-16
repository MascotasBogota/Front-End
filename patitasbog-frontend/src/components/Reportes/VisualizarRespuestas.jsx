import React, { useState } from 'react'; 
import '../../styles/PreviewReporte.css';
import MapaLectura from './MapaLectura';

const VisualizarRespuestas = (id_reporte, ids_respuestas) => {

    return(
        <div className='preview-container'>
            <div className='preview-columna'>
                <div className='mapa-preview-container'>
                    <MapaLectura ubicacion={[4.612, -74.07]} />
                </div>
            </div> 
            <div className='preview-columna-altern'>
                <div className='texto-preview'>
                    <p>Tipo: Avistamiento</p>
                    <p>Fecha: 16/06/2025</p>
                    <p>Hora: 15:30</p>
                    <p>Detalles Detalles Detalles 
                       Detalles Detalles Detalles
                       Detalles Detalles Detallles
                    </p>
                </div>
                <div className='container-button-picture-preview'>
                    <div className='foto-preview-container'>
                        <img src='images/foto_mascota.png'
                           className='foto-preview'/>
                    </div>
                    <div className='div-buttons-preview'>
                        <span className='button-four'>
                            <a href='edit_seen'>Editar</a>
                        </span>
                        <span className='button-principal'>
                            <a href='edit_seen'>Eliminar</a>
                        </span>
                    </div>
                </div>
            </div> 
        </div>
    )
}

export default VisualizarRespuestas;