import React, { useEffect, useState } from 'react';
import runner from './assets/RUNNER.gif';
import './Loading.css';

const Loading = ({ onComplete }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onComplete();
        }, 2000); 

        return () => clearTimeout(timer);
    }, [onComplete]);

    return (
        <div className="loading-container">
            <img src={runner} alt="Loading" className="loading-gif" />
            <div className="loading-bar-container">
                <div className="loading-bar"></div>
            </div>
        </div>
    );
};

export default Loading;
