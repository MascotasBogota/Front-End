import React, { useState } from 'react'; 
import '../../styles/VisualizarReportes.css';
import MapaLectura from '../../components/Reportes/MapaLectura';

const VisualizarPerdidaDetalle = (id_reporte, ids_respuestas) => {
    return(
        <div className='visualizacion-container'>
            <div className='cabecera-visualizacion'>
                <span className='button-three'>
                    <a href='/home'>Volver</a>
                </span>
            </div>
            <div className='reporte-perdida-container'>
                    <div className='reporte-perdida-columna'>
                        <div className='foto-reporte-container'>
                           <img src='images/foto_mascota.png'
                           className='foto-reporte'/>
                        </div>
                        <div className='mapa-container'>
                            <MapaLectura ubicacion={[4.612, -74.07]} />
                        </div>
                    </div>
                    <div className='reporte-perdida-columna'>
                        <div className='titulo-reporte-perdida'>
                            <h2>El Bigotes</h2>
                            <p>Fecha: 16/06/2025</p>
                            <p>Hora: 17:39</p>
                        </div>
                        <div className='detalles-reporte-perdida'>
                            <p>Detalles Detalles Detalles Detalles Detalles 
                                Detalles Detalles Detalles Detalles Detalles
                                Detalles Detalles Detalles Detalles Detalles
                                Detalles Detalles Detalles Detalles Detalles
                                Detalles Detalles Detalles Detalles Detalles 
                                Detalles Detalles Detalles Detalles Detalles 
                            </p>
                        </div>
                        <div className='div-botones-reporte-perdida'>
                            <span className='button-four'>
                                <a href='/create_seen'>Avistamiento</a>
                            </span>
                            <span className='button-principal'>
                                <a href='/create_found'>Hallazgo</a>
                            </span>
                        </div>
                        <div className='div-botones-reporte-perdida'>
                            <span className='button-principal'>
                                <a href='/home'>Eliminar</a>
                            </span>
                            <span className='button-four'>
                                <a href='/edit_lost'>Editar</a>
                            </span>
                        </div>
                    </div>
            </div>
        </div>
    )
}

export default VisualizarPerdidaDetalle;