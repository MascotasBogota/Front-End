import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from '../../styles/DetailsReport.module.css';
import MapaLectura from './MapaLectura';

const ResponseDetails = () => {
    return (
        <div className={styles.response_box}>   
            <div className={styles.response_header}>
                <img src='/images/sin_foto_perfil.png' className={styles.response_profile_photo}></img>
                <div className={styles._response_user_text_container}>
                    <div className={styles.response_principal_text}>
                        <p className={styles.response_nombre}>
                            Gustavo Petro
                        </p>
                    </div>
                    <p className={styles.response_username}>
                        @gustavito1234
                    </p>
                </div>
                <span className={styles.response_type_label}>Avistamiento</span>
                <img src='/icons/pencil.svg' className={styles.response_change_icon} />
                <img src='/icons/trash.svg' className={styles.response_change_icon} />
            </div>
            <div className={styles.response_description}>
                <p className={styles.response_description_text}>
                    Es muy amigable, pero puede estar asustado. 
                    Llevaba un collar rojo sin placa cuando se escapó. 
                    Tiene una cicatriz pequeña en la oreja izquierda y 
                    responde cuando lo llaman por su nombre. Es parte 
                    de nuestra familia desde cachorro. Nunca se ha 
                    perdido antes y estamos muy angustiados. Si alguien 
                    lo ha visto o tiene alguna información, por favor...
                </p>
            </div>
            <div className={styles.response_location_photo}>
                
                <div className={styles.map_response_container}>
                    <MapaLectura ubicacion={[4.711, -74.0721]} dragging={true}/> 
                </div>
                <div className={styles.response_photo_container}>
                    <img src='/images/sin_foto_mascota.jpg' className={styles.response_photo} />    
                </div>
            </div>
            <div className={styles.response_footer}>
                <p className={styles.reputation_text}>¿Fue útil esta respuesta?</p>
            </div>
        </div>
    )
}

export default ResponseDetails;