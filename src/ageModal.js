import React, { useEffect, useState } from 'react';
import './ageModal.css';

const AgeModal = ({ isOpen, onClose, phone }) => {
    const [animate, setAnimate] = useState(isOpen);

    useEffect(() => {
        if (isOpen) {
            setAnimate(true);
        } else {
            const timeoutId = setTimeout(() => setAnimate(false), 300);
            return () => clearTimeout(timeoutId);
        }
    }, [isOpen]);

    const handleClose = (isOfAge) => {
        setAnimate(false);
        setTimeout(() => {
            if (isOfAge) {
                onClose();
            } else {
                window.location.href = 'https://www.google.com';
            }
        }, 300);
    };

    if (!animate && !isOpen) return null;

    const modalClass = phone ? 'modal-new-mobile' : 'modal-new';
    const buttonContainer = phone ? 'button-container-mobile' : 'button-container';
    const button = phone ? 'button-mobile' : 'button-desktop';

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.8)', animation: `${animate ? 'fadeIn' : 'fadeOut'} 0.5s` }} onClick={() => handleClose(false)}>
            <div className={modalClass} onClick={e => e.stopPropagation()}>
                <div className="modal-content-new">
                    <h2 style={{ fontSize: '48px', textAlign: 'center', paddingTop: '40px', margin: 0, width: '100%' }}>
                        Êtes-vous majeur.e ?
                    </h2>
                    <div className={buttonContainer}>
                        <button className={button} onClick={() => handleClose(true)}><h4 style={{ color: '#000000' }}>OUI</h4></button>
                        <button className={button} onClick={() => handleClose(false)}><h4 style={{ color: '#000000' }}>NON</h4></button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AgeModal;
