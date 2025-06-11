import React from 'react'; 
import Bienvenida from '../../components/Login/Bienvenida/Bienvenida'
import FormRecuperacion from '../../components/Login/FormRecuperacion/FormRecuperacion';

const ViewRecuperarClave = () => {
    return (
        <div className='container-generic'>
            <Bienvenida />
            <FormRecuperacion />
        </div>
    );
};

export default ViewRecuperarClave;