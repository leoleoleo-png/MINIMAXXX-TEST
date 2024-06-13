import React, { useState, useEffect } from 'react';
import './modal.css';
import { fetchAddresses } from './apiAddresses';

const Modal = ({ isOpen, onClose, phone }) => {
    const [addresses, setAddresses] = useState([]);
    const [show, setShow] = useState(isOpen);

    useEffect(() => {
        if (isOpen) {
            setTimeout(() => {
                setShow(true);
            }, 200);
            fetchAddresses()
                .then(data => setAddresses(data))
                .catch(error => console.error('Error fetching addresses:', error));
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
    const listClass = phone ? 'address-list-mobile' : 'address-list';

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            handleClose();
        }
    };

    if (!show && !isOpen) return null;

    return (
        <div className={`${overlayClass} ${show ? 'show' : ''}`} onClick={handleOverlayClick}>
            <div className={modalClass} onClick={e => e.stopPropagation()}>
                <div className={contentClass}>
                    <div className={listClass}>
                        {addresses.map((address) => (
                            <div key={address.id}>
                                <a href={address.link} target="_blank" rel="noopener noreferrer">
                                    <h2 style={{ fontSize: '48px', textAlign: 'left', margin: 0, paddingTop: '15px' }}>{address.name}</h2>
                                    <p style={{ marginBottom: '2px', marginTop: '10px' }}>{address.street}</p>
                                    <p>{address.postcode}</p>
                                    <p>{address.country}</p>
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;
