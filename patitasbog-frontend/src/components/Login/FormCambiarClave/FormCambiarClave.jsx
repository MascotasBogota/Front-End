import {React, useState} from 'react'
import './FormCambiarClave.css'

const FormCambiarClave = () => {
    const [showMessage, setShowMessage] = useState(true);
    return(
        <div className='caja-formulario'>
            <h1>Reestablacer Contraseña</h1>
            <p>Ingresa el correo electrónico asociado a tu cuenta, 
                será enviado un código de confirmación que deberás 
                digitar para hacer efectivo el restablecimiento de 
                tu contraseña.
            </p>
            <span>Correo</span>
            <form>
                <input type="email" />
                <button type="submit">Enviar</button>
            </form>
        </div>
    )
}

export default FormCambiarClave;