import React, { useState } from 'react'; 
import '../../styles/VisualizarReportes.css';
import MapaLectura from '../../components/Reportes/MapaLectura';

const VisualizarPerdidaDetalle = (id_reporte, ids_respuestas) => {
    return(
        <div className='visualizacion-container'>
            <div className='cabecera-visualizacion'>
                <a href='/home'>
                    <span className='button-three'>
                        Volver
                    </span>
                </a>
            </div>
            <div className='reporte-perdida-container'>
                    <div className='reporte-perdida-columna'>
                        <div className='foto-reporte-container'>
                           <img src='images/foto_mascota.png'
                           className='foto-reporte'/>
                        </div>
                        <div className='mapa-container'>
                            <MapaLectura ubicacion={[4.612, -74.07]} dragging={true} />
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
                            <a href='/create_seen'>
                                <span className='button-four'>
                                Avistamiento
                                </span>
                            </a>
                            <a href='/create_found'>
                                <span className='button-principal'>
                                Hallazgo
                                </span>
                             </a>
                        </div>
                        <div className='div-botones-reporte-perdida'>
                            <a href='/home'>
                                <span className='button-principal'>
                                Eliminar
                                </span>
                            </a>
                            <a href='/edit_lost'>
                            <span className='button-four'>
                                Editar
                            </span>
                            </a>
                        </div>
                    </div>
            </div>
        </div>
    )
}

export default VisualizarPerdidaDetalle;