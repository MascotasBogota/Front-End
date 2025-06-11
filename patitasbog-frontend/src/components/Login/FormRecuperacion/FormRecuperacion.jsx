import {React, useState} from 'react'
import './FormRecuperacion.css'

const FormRecuperacion = () => {
    const [showMessage, setShowMessage] = useState(true);
    const [correo, setCorreo] = useState('');
    
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Correo: ', correo);
    };

    return(
        <div className='caja-formulario'>
            <h1>Reestablacer Contraseña</h1>
            <p>Ingresa el correo electrónico asociado a tu cuenta, 
                será enviado un código de confirmación que deberás 
                digitar para hacer efectivo el restablecimiento de 
                tu contraseña.
            </p>
            <form onSubmit={handleSubmit}>
                <label>Correo</label>
                <input type="email" onChange={(e) => setCorreo(e.target.value)}/>
                <button type="submit" className="button-principal"
                >Enviar</button>
            </form>
        </div>
    )
}

export default FormRecuperacion;