import React, { useEffect, useState } from 'react';
import './ageModal.css';

const AgeModal = ({ isOpen, onClose, phone }) => {
    const [animate, setAnimate] = useState(false);

    useEffect(() => {
        let timeoutId;
        if (isOpen) {
            setAnimate(true);
        } else {
            timeoutId = setTimeout(() => {
                setAnimate(false);
            }, 300);
        }
        return () => clearTimeout(timeoutId);
    }, [isOpen]);

    const handleClose = () => {
        setAnimate(false);
        setTimeout(() => {
            onClose();
        }, 300);
    };


    if (!animate && !isOpen) return null;

    const overlayClass = phone ? 'modal-overlay-mobile' : 'modal-overlay';
    const modalClass = phone ? 'modal-new-mobile' : 'modal-new';
    const buttonContainer = phone ? 'button-container-mobile' : 'button-container';
    const button = phone ? 'button-mobile' : 'button-desktop';


    return (
        <div className={overlayClass} style={{ animation: `${animate ? 'fadeIn' : 'fadeOut'} 0.3s` }} onClick={handleClose}>
            <div className={modalClass} onClick={e => e.stopPropagation()}>
                <div className="modal-content-new">
                    <h2 style={{ fontSize: '48px', textAlign: 'center', paddingTop: '40px', margin: 0, width: '100%' }}>
                        Êtes-vous majeur.e ?
                    </h2>
                    <div className={buttonContainer}>
                        <button className={button} onClick={handleClose}><h4>OUI</h4></button>
                        <button className={button} onClick={handleClose}><h4>NON</h4></button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AgeModal;
