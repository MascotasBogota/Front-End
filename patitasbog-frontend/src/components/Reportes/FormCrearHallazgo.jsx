import React, { useState } from 'react'; 
import '../../styles/FormsReportes.css';
import MapaSelector from './MapaSelector';

const FormCrearHallazgo = ({mascota, onChangeSuccess, onChangeFail}) => {
    const tiporeporteInput = 'Hallazgo';
    const nombremascotaInput = mascota;
    const [fechaInput, setFechaInput] = useState('');
    const [horaInput, setHoraInput] = useState('');
    const [detallesInput, setDetallesInput] = useState('');
    const [ubicacionInput, setUbicacionInput] = useState(null);
    const [imagenInput, setImagenInput] = useState(null);
    
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && (file.type === "image/jpeg" || file.type === "image/png")) {
            setImagenInput(file);
        } else {
            alert("Por favor selecciona una imagen JPG o PNG.");
            e.target.value = null;
        }
    };

    const validateForm = () => {
        let currentErrors = []; 
        let isValid = true;   

        if (nombremascotaInput==='') {
            currentErrors.push('El campo de nombre mascota no puede estar vacío.');
            isValid = false;
        }
        if (fechaInput==='') {
            currentErrors.push('El campo de fecha no puede estar vacío.');
            isValid = false;
        }
        if (horaInput==='') {
            currentErrors.push('El campo de hora no puede estar vacío.');
            isValid = false;
        }
        if (detallesInput==='') {
            currentErrors.push('El campo de detalles no puede estar vacío.');
            isValid = false;
        }
        if (ubicacionInput==null) {
            currentErrors.push('El campo de ubicacion no puede estar vacío.');
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
                    '¡Reporte de avistamiento creado correctamente!',
                    'inicio',
                    'home'
                );
            }, 500); 
        }
        else {
            setTimeout(() => {
                onChangeFail(
                    '¡Error al crear reporte',
                    errors
                );
            }, 500); 
        }
    }; 

    return (
        <div className='container-modulo-reportes'>
            <div className='cabecera-container-reportes'>
                <span className='spacer'></span>
                <span className='title'><h2>Crear Reporte</h2></span>
                <a href='/home'><span className='close'>X</span></a>
            </div>
            <form onSubmit={handleSubmit} className='formulario-modulo-reportes'>
                    <div className='columnas-container-reportes'>
                    <div className= 'filas-container-reportes'>
                        <label>Tipo de Reporte</label>
                        <span className='blocked-input'>{tiporeporteInput}</span>
                        <p className='behind-input'></p>
                        <label>Fecha*</label>
                        <input value={fechaInput}
                        onChange={(e) => setFechaInput(e.target.value)} 
                            type="date"
                        />
                        <p className='behind-input'></p>
                    </div>
                    <div className= 'filas-container-reportes'>
                        <label>Nombre Mascota</label>
                        <span className='blocked-input'>
                            {nombremascotaInput}
                        </span>
                        <p className='behind-input'></p>
                        <label>Hora*</label>
                        <input value={horaInput}
                        onChange={(e) => setHoraInput(e.target.value)} 
                            type="time"
                        />
                        <p className='behind-input'></p>
                    </div>
                </div>
                <label>Detalles*</label>
                <textarea className='textarea-reportes'
                    value={detallesInput}
                    onChange={(e) => setDetallesInput(e.target.value)}
                    rows="5"
                />
                <p className='behind-input'></p>
                <div className='columnas-container-reportes'>
                    <div className= 'filas-container-reportes'>
                        <label>Ubicación*</label>
                        <MapaSelector setUbicacion={setUbicacionInput} ubicacionInicial={ubicacionInput}/>
                        <p className='behind-input'></p>
                    </div>
                    <div className= 'filas-container-reportes'>
                        <label className="label-foto">Foto (JPG o PNG)</label>
                        <input
                        type="file"
                        accept=".jpg,.jpeg,.png"
                        onChange={(e) => handleFileChange(e)}
                        className="input-foto"
                        />

                        {imagenInput && (
                        <img
                            src={URL.createObjectURL(imagenInput)}
                            alt="Preview"
                            className="preview-foto"
                        />
                        )}
                    </div>
                </div>
                <div className='buttons-div-reportes'>
                    <a href='/home' className='button-secondary'>Descartar</a>
                    <button type="submit" className="button-principal">Crear</button>
                </div>
            </form>
            <h3>Los campos señalados con * no pueden quedar vacíos</h3>
        </div>
    );
};

export default FormCrearHallazgo;