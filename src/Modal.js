import React, { useState, useEffect } from 'react';
import './modal.css';
import { fetchAddresses } from './apiAddresses';

const Modal = ({ isOpen, onClose, phone }) => {
    const [addresses, setAddresses] = useState([]);
    const [animate, setAnimate] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setAnimate(true);
            fetchAddresses()
                .then(data => setAddresses(data))
                .catch(error => console.error('Error fetching addresses:', error));
        }
    }, [isOpen]);

    const handleClose = () => {
        setAnimate(false);
        setTimeout(onClose, 300);
    }

    if (!isOpen && !animate) return null;

    const overlayClass = phone ? 'modal-overlay-mobile' : 'modal-overlay';
    const modalClass = phone ? 'modal-mobile' : 'modal';
    const contentClass = phone ? 'modal-content-mobile' : 'modal-content';
    const listClass = phone ? 'address-list-mobile' : 'address-list';

    return (
        <div className={overlayClass} style={{ animation: `${animate ? 'fadeIn' : 'fadeOut'} 0.3s` }} onClick={handleClose}>
            <div className={modalClass}>
                <div className={contentClass}>
                    <div className={listClass}>
                        {addresses.map((address, index) => (
                            <div key={index}>
                                <h2 style={{ fontSize: '48px', textAlign: 'left', margin: 0, paddingTop: '15px', paddingBottom:0 }}>{address.name}</h2>
                                <p style={{marginBottom:'2px', marginTop:'10px'}}>{address.street}</p>
                                <p>{address.postcode}</p>
                                <p>France</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;
