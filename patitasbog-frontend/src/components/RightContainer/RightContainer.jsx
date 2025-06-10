import React from 'react';
import './RightContainer.css';

const RightContainer = ({ children }) => {
    return (
        <div className="right-container">
            {children}
        </div>
    );
};

export default RightContainer;