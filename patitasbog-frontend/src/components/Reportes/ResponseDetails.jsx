import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from '../../styles/DetailsReport.module.css';
import MapaLectura from './MapaLectura';

const ResponseDetails = () => {
    const [like_clicked, setLike_Clicked] = useState(false);
    const [dislike_clicked, setDislike_Clicked] = useState(false);

    const handle_like_click = () => {
        setLike_Clicked(!like_clicked);
    }

    const handle_dislike_click = () => {
        setDislike_Clicked(!dislike_clicked);
    }

    return (
        <div className={styles.response_box}>   
            <div className={styles.response_header}>
                <img src='/images/sin_foto_perfil.png' className={styles.response_profile_photo}></img>
                <div className={styles._response_user_text_container}>
                    <div className={styles.response_principal_text}>
                        <p className={styles.response_nombre}>
                            Gustavo Petro
                        </p>
                        <img src='/icons/star.svg' className={styles.response_reputation_icon} />
                        <p className={styles.response_nombre}>
                            5.0
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
            <div className={styles.datetime_container_response}>
                <p className={styles.datetime_text_response}>Fecha: 06/30/2025</p>
                <p className={styles.datetime_text_response}>Hora: 1:31 A.M.</p>
            </div>
            <p className={styles.response_description_text}>
                Es muy amigable, pero puede estar asustado. 
                Llevaba un collar rojo sin placa cuando se escapó. 
                Tiene una cicatriz pequeña en la oreja izquierda y 
                responde cuando lo llaman por su nombre. Es parte 
                de nuestra familia desde cachorro. Nunca se ha 
                perdido antes y estamos muy angustiados. Si alguien 
                lo ha visto o tiene alguna información, por favor...
            </p>
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
                {!like_clicked && (
                        <img src='/icons/grey_like.svg' alt='Like' 
                        className={styles.response_calification_icon} onClick={handle_like_click}/>
                    )
                }
                {like_clicked && (
                        <img src='/icons/green_like.svg' alt='Like' 
                        className={styles.response_calification_icon} onClick={handle_like_click}/>
                    )
                }
                {!dislike_clicked && (
                        <img src='/icons/grey_dislike.svg' alt='Dislike' 
                        className={styles.response_calification_icon} onClick={handle_dislike_click}/>
                    )
                }
                {dislike_clicked && (
                        <img src='/icons/red_dislike.svg' alt='Dislike' 
                        className={styles.response_calification_icon} onClick={handle_dislike_click}/>
                    )
                }
            </div>
        </div>
    )
}

export default ResponseDetails;