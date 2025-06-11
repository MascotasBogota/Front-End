import React from 'react'; 
import Bienvenida from '../../components/Login/Bienvenida/Bienvenida'
import FormCambiarClave from '../../components/Login/FormCambiarClave/FormCambiarClave';

const ViewCambiarClave = () => {
    return (
        <div className='container-generic'>
            <Bienvenida />
            <FormCambiarClave />
        </div>
    );
};

export default ViewCambiarClave;