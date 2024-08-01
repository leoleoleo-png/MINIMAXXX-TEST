import React, { useRef, useState, useEffect } from 'react';
import Draggable from 'react-draggable';
import './App.css';
import move from './assets/move.png';
import minimise from './assets/minimise.png';

const ContactPopup = ({ contacts, mobile, onMinimize, zIndex, onClick }) => {
    const dragHandleRef = useRef(null);
    const popupRef = useRef(null);
    const [bounds, setBounds] = useState({ left: 0, top: 0, right: window.innerWidth, bottom: window.innerHeight });

    const updateBounds = () => {
        if (popupRef.current) {
            const popup = popupRef.current;
            const width = popup.getBoundingClientRect().width;
            const height = popup.getBoundingClientRect().height;
            setBounds({
                left: 0,
                top: 0,
                right: window.innerWidth - width,
                bottom: window.innerHeight - height,
            });
        }
    };

    useEffect(() => {
        updateBounds();
        window.addEventListener('resize', updateBounds);
        return () => window.removeEventListener('resize', updateBounds);
    }, []);

    const getRandomPosition = () => {
        const width = mobile ? window.innerWidth / 1.2 : popupRef.current ? popupRef.current.getBoundingClientRect().width : 300;
        const height = mobile ? 150 : popupRef.current ? popupRef.current.getBoundingClientRect().height : 450;
        const x = Math.random() * (window.innerWidth - width);
        const y = Math.random() * (window.innerHeight - height);
        return { x, y };
    };

    const handleMinimizeClick = (event) => {
        event.stopPropagation();
        if (onMinimize) {
            onMinimize();
        }
    };

    return (
        <Draggable
            handle=".drag-handle"
            bounds={bounds}
            defaultPosition={getRandomPosition()}
            onMouseDown={onClick}
        >
            <div
                ref={popupRef}
                style={{
                    position: 'relative',
                    zIndex: zIndex,
                    background: '#FFFFFF',
                    border: '1px solid #000000',
                    display: 'flex',
                    flexDirection: 'column',
                    width: mobile ? window.innerWidth / 1.2 : window.innerWidth/5,
                }}
            >
                <div
                    ref={dragHandleRef}
                    className="drag-handle"
                    style={{
                        position: 'absolute',
                        top: '-1.5px',
                        left: '-1.5px',
                        right: '-1.5px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        backgroundColor: '#000000',
                        height: '30px',
                        cursor: 'move',
                        zIndex: 2
                    }}
                >
                    <div style={{ width: '50px' }} />
                    <h3>CONTACT</h3>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingRight: '5px' }}>
                        <img
                            onClick={handleMinimizeClick}
                            onTouchStart={handleMinimizeClick}
                            src={minimise}
                            style={{ width: '21px', height: '21px', cursor: 'pointer' }}
                        />
                        <img src={move} style={{ width: '21px', height: '21px', pointerEvents: 'none' }} />
                    </div>
                </div>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    paddingTop: '40px',
                    paddingBottom: '20px',
                    paddingLeft: '20px',
                    paddingRight: '20px',
                }}>
                    {contacts.map((contact, index) => (
                        <h3  key={index} style={{ margin: '10px 0', color:'#0029FF', textDecorationLine:'underline' }}>{contact}</h3>
                    ))}
                </div>
            </div>
        </Draggable>
    );
};

export default ContactPopup;
