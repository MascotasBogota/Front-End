import React from 'react';
import './LeftContainer.css';

const LeftContainer = ({ children }) => {
    return (
        <div className="left-container">
            {children}
        </div>
    );
};

export default LeftContainer;