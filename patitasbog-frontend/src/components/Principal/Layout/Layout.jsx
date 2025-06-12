import React, { useState, useEffect } from 'react'; // Importamos useState y useEffect
import { useLocation } from 'react-router-dom';
import Navbar from '../Navbar/Navbar'; 
import LeftContainer from '../LeftContainer/LeftContainer';
import MainContainer from '../MainContainer/MainContainer';
import RightContainer from '../RightContainer/RightContainer';
import './Layout.css';

const Layout = ({ children }) => {
    const location = useLocation();
    const [showLeftContainer, setShowLeftContainer] = useState(true);

    useEffect(() => {
        if(location.pathname=='/login' || location.pathname=='/register'
           || location.pathname=='/recover_password_request'
            || location.pathname=='/change_password'){
            setShowLeftContainer(false);
        }
        else{
            setShowLeftContainer(true);
        }
    }, [location.pathname]);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
            <Navbar />
            <div className="main-content-wrapper">
                {showLeftContainer && (
                    <LeftContainer>
                    </LeftContainer>
                )}
                <MainContainer className='main-container'>
                    {children}
                </MainContainer>
                <RightContainer>
                </RightContainer>
            </div>
        </div>
    );
};

export default Layout;