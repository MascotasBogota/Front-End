import {React, useState} from 'react'
import './FormCambiarClave.css'
import PasswordInput from '../PasswordInput/PasswordInput';

const FormCambiarClave = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [codeConfirmation, setCodeConfirmation] = useState('');
    const [showMessage, setShowMessage] = useState(true);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Nueva Contraseña:', password);
        console.log('Confirmar Contraseña:', confirmPassword);
        console.log('Codigo Confirmación:', codeConfirmation);
    };

    return(
        <div className='caja-formulario'>
            <h1>Reestablacer Contraseña</h1>
            <p>Ingresa tu nueva contraseña a continuación</p>
            <form onSubmit={handleSubmit}>
                <PasswordInput
                    label="Nueva Contraseña:"
                    id="newPassword"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    name="newPassword"
                    required
                />
                <PasswordInput
                    label="Confirmar Contraseña:"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    name="confirmPassword"
                    required
                />
                <label>Código de confirmación enviado al correo</label>
                <input type="text" onChange={(e) => setCodeConfirmation(e.target.value)}/>
                <button type="submit" className="button-principal">Enviar</button>
            </form>
        </div>
    )
}

export default FormCambiarClave;