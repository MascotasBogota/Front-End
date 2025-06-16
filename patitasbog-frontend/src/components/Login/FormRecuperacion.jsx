import {React, useState} from 'react'
import '../../styles/FormsLogin.css';

const FormRecuperacion = ({ onChangeSuccess, onChangeFail }) => {
    const [correo, setCorreo] = useState('');
    const [found, setFound] = useState(true);

    const validateForm = () => {
        let currentErrors = []; 
        let isValid = true;   

        if (correo === '' ){
            currentErrors.push('Todos los campos son obligatorios.');
            isValid = false;
        }
        if (!found) { 
            currentErrors.push('El correo no fue encontrado.');
            isValid = false;
        }
        return { isValid, errors: currentErrors.join('\n') };
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { isValid, errors } = validateForm();

        if (isValid) {
            setTimeout(() => {
                onChangeSuccess(
                    '¡Correo enviado correctamente!',
                    'Cambiar contraseña',
                    'change_password'
                );
            }, 500); 
        }
        else {
            setTimeout(() => {
                onChangeFail(
                    '¡Error al enviar código de confirmación!',
                    errors
                );
            }, 500); 
        }
    };

    return(
        <div className='container-modulo-login'>
            <h1>Reestablacer Contraseña</h1>
            <p>Ingresa el correo electrónico asociado a tu cuenta, 
                será enviado un código de confirmación que deberás 
                digitar para hacer efectivo el restablecimiento de 
                tu contraseña.
            </p>
            <form onSubmit={handleSubmit} className='formulario-modulo-login'>
                <label>Correo</label>
                <input type="email" onChange={(e) => setCorreo(e.target.value)}/>
                <button type="submit" className="button-principal"
                >Enviar</button>
            </form>
        </div>
    )
}

export default FormRecuperacion;