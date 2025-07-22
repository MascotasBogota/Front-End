import React, { useState, useEffect, useContext } from 'react'; // Importamos useState y useEffect
import Navbar from '../components/Principal/Navbar'; 
import styles from '../styles/Layout.module.css';
import { AuthContext } from "../contexts/AuthContext"
import { notificationService } from '../services/notificationService';
import NotificationView from './Notifications/NotificationView'; 

const Layout = ({ children }) => {
    const { isAuthenticated } = useContext(AuthContext);
    const [notifications, setNotifications] = useState([]);
    const [opennotifications, setOpenNotifications] = useState(false);

    useEffect(() => {
        const fetchNotificacions = async () => {
            try {
                const response = await notificationService.getCurrentUserNotifications();
                setNotifications(response.data.notifications);
                console.log(response);
            } catch (error) {
                console.log(error);
            }
        };

        if (isAuthenticated) {
            fetchNotificacions();
        }
    }, [isAuthenticated]);

    return (
        <div className={styles.view}>
            <Navbar handleOpenNotifications={() => setOpenNotifications(true)}/>
            <div className={styles.main_content_wrapper}>
                {children}
            </div>
            {isAuthenticated && opennotifications &&<NotificationView notificaciones={notifications} handleClose={() => setOpenNotifications(false)}/>}
        </div>
    );
};

export default Layout;