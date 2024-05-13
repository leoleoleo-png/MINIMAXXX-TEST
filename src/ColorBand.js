import React, { useState, useEffect } from 'react';
import './colorBand.css';

const ColorBand = ({ text, darkMode = false }) => {
    const [fadeIn, setFadeIn] = useState(false);

    useEffect(() => {
        setFadeIn(true);
    }, []);

    return (
        <a href={darkMode ? '/Bar' : '/Cognac'} className={`color-band ${darkMode ? 'dark' : 'light'} ${fadeIn ? 'fade-in' : ''}`}>
            <h4>{text}</h4>
        </a>
    );
}

export default ColorBand;
