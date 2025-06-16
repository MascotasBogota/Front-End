import React, { useState } from 'react';
import VisualizarPerdidaDetalles from '../../components/Reportes/VisualizarPerdidaDetalles'
import VisualizarRespuestas from '../../components/Reportes/VisualizarRespuestas'
import Success from '../../components/Principal/Success';
import Fail from '../../components/Principal/Fail';

const ViewEditarPerdida = () => {
        
    return (
        <div className='generic-container'>
            <VisualizarPerdidaDetalles />
            <VisualizarRespuestas />
        </div>
    );
};

export default ViewEditarPerdida;