import { useState, useEffect } from "react"
import styles from "../../styles/Notification.module.css"
import { Link } from "react-router-dom"
import { notificationService } from "../../services/notificationService"

const Notification = ( { notification } ) => {

    const handleVer = async () => {
        try{
            const response = await notificationService.markNotificationAsRead(notification.id);
        }catch(error){
            console.error("Error marking notification as read:", error);
        }
    }

    return(
        <div className={notification.is_read ? styles.notification_container : styles.notification_container_unread}>
            <div className={styles.notification_data}>
                <p className={styles.notification_title}>{notification.title}</p>
                <p className={styles.notification_type}>Tipo: {notification.notification_type}</p>
                <p className={styles.notification_message}>{notification.message}</p>
            </div>
            <div className={styles.notification_links}>
                <Link to={`/reportes/${notification.report_id}`} className={styles.notification_link}
                    onClick={handleVer}> Ver </Link> 
            </div>
        </div>
    )
}

export default Notification;