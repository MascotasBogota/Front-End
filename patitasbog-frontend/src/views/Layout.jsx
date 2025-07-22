import React, { useState, useEffect, useContext } from 'react'; // Importamos useState y useEffect
import Navbar from '../components/Principal/Navbar'; 
import styles from '../styles/Layout.module.css';
import { AuthContext } from "../contexts/AuthContext"
import { notificationService } from '../services/notificationService';

const Layout = ({ children }) => {
    const { isAuthenticated } = useContext(AuthContext);

    useEffect(() => {
        const fetchNotificacions = async () => {
            try {
                console.log("Notificaciones");
                const response = await notificationService.getCurrentUserNotifications();
                console.log(response);
                setIdUserLogued(response.profile._id);
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
            <Navbar />
            <div className={styles.main_content_wrapper}>
                {children}
            </div>
        </div>
    );
};

export default Layout;