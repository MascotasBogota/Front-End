import React, { useState, useEffect } from 'react'; // Importamos useState y useEffect
import Navbar from '../components/Principal/Navbar'; 
import '../../styles/Layout.css';

const Layout = ({ children }) => {

    return (
        <div className='view'>
            <Navbar />
            <div className="main-content-wrapper">
                {children}
            </div>
        </div>
    );
};

export default Layout;