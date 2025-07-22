import { useState, useEffect } from "react"
import styles from "../../styles/Notification.module.css"
import Notification from "../../components/Notificaciones/Notification"
import { notificationService } from "../../services/notificationService";

const NotificationView = ( { notificaciones, handleClose } ) => {
    const handleReadAll = async () => {
        try{
            const response = await notificationService.markAllAsRead();
        }catch(error){
            console.error("Error marking notification as read:", error);
        }
    }

    return(
        <div className={styles.notifications_window}>
            <div className={styles.notifications_header}>
                <p className={styles.notificationwindow_title}>Notificaciones</p>
                <div>
                    <img src="/icons/check.svg" alt="check icon" className={styles.check_icon}
                        onClick={handleReadAll} />
                    <img src="/icons/close_icon.svg" alt="close icon" className={styles.check_icon}
                        onClick={handleClose} />
                </div>
            </div>
            {notificaciones.map((notification) => (
                <Notification key={notification.id} notification={notification} />
            ))}
        </div>

    )
}

export default NotificationView;