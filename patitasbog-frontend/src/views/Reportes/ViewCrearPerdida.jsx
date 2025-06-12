import React, { useState } from 'react';
import FormCrearPerdida from '../../components/Reportes/FormCrearPerdida/FormCrearPerdida'
import Success from '../../components/Principal/PopUpMessages/Success';
import Fail from '../../components/Principal/PopUpMessages/Fail';

const ViewCrearPerdida = () => {
    const nombre='Juan Pérez';
    const email='juan@ejemplo.com';
    const usuario='juanperez';
    const genero='Masculino';
    const direccion='Calle Falsa 123, Ciudad';
    const telefono='+1234567890';
    
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
    const [titleSuccess, setTitleSuccess] = useState('');  
    const [endSuccess, setEndSuccess] = useState('');     
    const [redirectSuccess, setRedirectSuccess] = useState(''); 
    
    const handleChangeSuccess = (title, end, redirect) => {
        setTitleSuccess(title);
        setEndSuccess(end);
        setRedirectSuccess(redirect);
        setShowSuccessPopup(true);
    };
    
    const [showFailPopup, setShowFailPopup] = useState(false);
    const [titleFail, setTitleFail] = useState('');  
    const [bodyFail, setBodyFail] = useState('');      
    
    const handleChangeFail= (title, body) => {
        setTitleFail(title);
        setBodyFail(body);
        setShowFailPopup(true);
    };
    
    return (
        <div className='container-generic'>
            <FormCrearPerdida nombre={nombre}
                email={email}
                usuario={usuario}
                genero={genero}
                direccion={direccion}
                telefono={telefono}
                onChangeSuccess={handleChangeSuccess}
                onChangeFail={handleChangeFail}
            />
            {showSuccessPopup && (
                <Success
                    title={titleSuccess}
                    end={endSuccess}
                    redirect={redirectSuccess}
                />
            )}
            {showFailPopup && (
                <Fail
                    setShowFailPopup={setShowFailPopup}
                    title={titleFail}
                    body={bodyFail}
                />
            )}
        </div>
    );
};

export default ViewCrearPerdida;