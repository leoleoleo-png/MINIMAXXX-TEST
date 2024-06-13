import React, { useState, useEffect } from 'react';
import './modal.css';
import { fetchContactInfo } from './apiContact';

const ModalContact = ({ isOpen, onClose, phone }) => {
    const [contactInfo, setContactInfo] = useState({});
    const [show, setShow] = useState(isOpen);

    useEffect(() => {
        if (isOpen) {
            setShow(true);
            fetchContactInfo()
                .then(data => setContactInfo(data))
                .catch(error => console.error('Error fetching contact info:', error));
        }
    }, [isOpen]);

    const handleClose = () => {
        setShow(false);
        setTimeout(() => {
            onClose();
        }, 300);
    };

    const overlayClass = phone ? 'modal-overlay-mobile' : 'modal-overlay';
    const modalClass = phone ? 'modal-mobile' : 'modal';
    const contentClass = phone ? 'modal-content-mobile' : 'modal-content';
    const listClass = phone ? 'contact-list-mobile' : 'contact-list';

    const styles = { textAlign: 'left', width: '100%', padding: 0, margin: 0, paddingBottom: '5px' }

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            handleClose();
        }
    };

    if (!show && !isOpen) return null;

    return (
        <div className={`${overlayClass} ${show ? 'show' : ''}`} onClick={handleOverlayClick}>
            <div className={modalClass} style={{ width: phone ? '100%' : '20%' }} onClick={e => e.stopPropagation()}>
                <div className={contentClass}>
                    <div className={listClass}>
                        <h2 style={{ fontSize: '48px', textAlign: 'left', margin: 0, paddingTop: '20px', width: '100%' }}>Contacte nous</h2>
                        <a href={`mailto:${contactInfo.email}`} target="_blank" rel="noopener noreferrer">
                            <h3 style={{ ...styles, paddingTop: '20px' }}>{contactInfo.email}</h3>
                        </a>
                        <h3 style={{ ...styles, paddingTop: '20px' }}>{contactInfo.telephone}</h3>
                        <a href={contactInfo.addresslink} target="_blank" rel="noopener noreferrer">
                            <h3 style={{ ...styles, paddingTop: '20px' }}>{contactInfo.street}</h3>
                            <h3 style={styles}>{contactInfo.zipcode}</h3>
                            <h3 style={{ ...styles, paddingBottom: '20px' }}>{contactInfo.country}</h3>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalContact;
