import React, { useState, useEffect } from 'react';
import './modal.css';
import { fetchCocktails } from './apiCocktails';

const ModalCarte = ({ isOpen, onClose, phone }) => {
    const [cocktails, setCocktails] = useState([]);
    const [show, setShow] = useState(isOpen);

    useEffect(() => {
        if (isOpen) {
            setShow(true);
            fetchCocktails()
                .then(data => setCocktails(data))
                .catch(error => console.error('Error fetching cocktails:', error));
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
                        {cocktails.map((cocktail) => (
                            <div key={cocktail.id} style={{ display: 'flex',position:'relative', flexDirection: 'column', padding: '5px', paddingBottom:'30px', minHeight:'115px' }}>
                                <h2 style={{  fontSize: '36px', textAlign: 'left', margin: 0, paddingTop: '15px',  width:  phone ? '50%':'60%'}}>{cocktail.name}</h2>
                                <p style={{ marginBottom: '2px', marginTop: '10px', width:  phone ? '50%':'70%' }}>{cocktail.recipe}</p>
                                {cocktail.image && cocktail.image.url && (
                                    <img src={cocktail.image.url} alt={cocktail.name} style={{ width: '120px', height: '120px', objectFit: 'cover', position:'absolute', right:0, top:'15px', borderRadius:'8px' }} />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalCarte;
