import React, { useState } from 'react'; 
import './FormPerfilEditar.css';

const FormPerfilEditar = ({nombre, email, usuario, genero, direccion, telefono, 
    onChangeSuccess, onChangeFail}) => {
    const [nombreInput, setNombreInput] = useState(nombre);
    const [usuarioInput, setUsuarioInput] = useState(usuario);
    const [generoInput, setGeneroInput] = useState(genero);
    const [direccionInput, setDireccionInput] = useState(direccion);
    const [telefonoInput, setTelefonoInput] = useState(telefono);

    const validateForm = () => {
        let currentErrors = []; 
        let isValid = true;   

        if (nombreInput==='') {
            currentErrors.push('El campo de nombre no puede estar vacío.');
            isValid = false;
        }
        if (usuarioInput ==='') {
            currentErrors.push('El campo de usuario no puede estar vacío.');
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
                    '¡Datos actualizados correctamente!',
                    'perfil',
                    'my_profile'
                );
            }, 500); 
        }
        else {
            setTimeout(() => {
                onChangeFail(
                    '¡Error al actualizar los datos de perfil!',
                    errors
                );
            }, 500); 
        }
    }; 

    return (
        <div className='caja-formulario'>
            <div className='cabecera'>
                <span className='spacer'></span>
                <span className='title'><h2>Perfil</h2></span>
                <a href='/home'><span className='close'>X</span></a>
            </div>
            <form onSubmit={handleSubmit}>
                    <div className='columnas-formulario'>
                    <div className= 'filas-formulario'>
                        <label>Nombre*</label>
                        <input value={nombreInput}
                        onChange={(e) => setNombreInput(e.target.value)} 
                            type="text"
                        />
                        <p className='behind-input'></p>
                        <label>Usuario*</label>
                        <input value={usuarioInput}
                        onChange={(e) => setUsuarioInput(e.target.value)} 
                            type="text"
                        />
                        <p className='behind-input'></p>
                        <label>Dirección</label>
                        <input value={direccionInput}
                        onChange={(e) => setDireccionInput(e.target.value)} 
                            type="text"
                        />
                        <p className='behind-input'></p>
                        <a href='/my_profile' className='button-secondary'>Descartar</a>
                    </div>
                    <div className= 'filas-formulario'>
                        <label>Correo</label>
                        <span className='blocked-input'>{email}</span>
                        <p className='behind-input'></p>
                        <label>Género</label>
                        <input value={generoInput}
                        onChange={(e) => setGeneroInput(e.target.value)} 
                            type="text"
                        />
                        <p className='behind-input'></p>
                        <label>Número de teléfono</label>
                        <input value={telefonoInput}
                        onChange={(e) => setTelefonoInput(e.target.value)} 
                            type="text"
                        />
                        <p className='behind-input'></p>
                        <button type="submit" className="button-principal">Guardar</button>
                    </div>
                </div>
            </form>
            <h3>Los campos señalados con * no pueden quedar vacíos</h3>
        </div>
    );
};

export default FormPerfilEditar;