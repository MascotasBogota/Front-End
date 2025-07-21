import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from '../../styles/DetailsReport.module.css';
import MapaLectura from './MapaLectura';

const ReportDetails = () => {
    return (
        <div className={styles.report_column}>   
            <div className={styles.principal_data}>
                <div className={styles.columna_izquierda}>
                    <div className={styles.titulos_reporte}>
                        <p className={styles.titulo_nombre}>Copito</p>
                        <span className={styles.etiqueta_estado}>Perdido</span>
                    </div>
                    <div className={styles.user_data}>
                        <img src='/images/sin_foto_perfil.png' className={styles.profile_photo}></img>
                        <div className={styles.user_text_container}>
                            <div className={styles.principal_text}>
                                <p className={styles.nombre}>
                                    Gustavo Petro
                                </p>
                                <img src='/icons/star.svg' className={styles.reputation_icon} />
                                <p className={styles.nombre}>
                                    5.0
                                </p>
                            </div>
                            <p className={styles.username}>
                                @gustavito1234
                            </p>
                        </div>
                    </div>
                    <div className={styles.created_at}>
                        <p className={styles.date_time_text}>
                            Fecha: 06/30/2025
                        </p>
                        <p className={styles.date_time_text}>
                            Hora: 1:31 A.M.
                        </p>
                    </div>
                    <div className={styles.photo_containter}>
                        <img src='/images/sin_foto_mascota.jpg' className={styles.photo} />
                    </div>
                </div>
                <div className={styles.columna_derecha}>
                    <div className={styles.modificaciones_reporte}>
                        <p className={styles.subtext}>
                            Puedes editar, eliminar o cerrar el 
                            reporte si ya tienes a tu mascota
                        </p>
                        <img src='/icons/check.svg' className={styles.change_icon} />
                        <img src='/icons/pencil.svg' className={styles.change_icon} />
                        <img src='/icons/trash.svg' className={styles.change_icon} />
                    </div>
                    <div className={styles.generar_respuestas}>
                        <p className={styles.subtext}>
                            Si viste o encontraste esta mascota puedes 
                            reportarlo aquí
                        </p>
                        <div className={styles.buttons_container}>
                            <Link to='' className={styles.seen_button}>Avistamiento</Link>
                            <Link to='' className={styles.found_button}>Encontrado</Link>
                        </div>
                    </div>
                    <div className={styles.map_containter}>
                        <MapaLectura ubicacion={[4.711, -74.0721]} dragging={true}/> 
                    </div>
                </div>
            </div>
            <div className={styles.description_reporte}>
                <p className={styles.description_text}>
                    Es muy amigable, pero puede estar asustado. 
                    Llevaba un collar rojo sin placa cuando se escapó. 
                    Tiene una cicatriz pequeña en la oreja izquierda y 
                    responde cuando lo llaman por su nombre. Es parte 
                    de nuestra familia desde cachorro. Nunca se ha 
                    perdido antes y estamos muy angustiados. Si alguien 
                    lo ha visto o tiene alguna información, por favor...
                </p>
            </div>
            
        </div>
    )
}

export default ReportDetails;