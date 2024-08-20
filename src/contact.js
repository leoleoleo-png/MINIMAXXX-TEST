import React, { useRef, useState, useEffect } from 'react';
import Draggable from 'react-draggable';
import './App.css';
import move from './assets/move.png';
import minimise from './assets/minimise.png';
import cmsContactDataPromise from './cms/cmsContact';

const ContactPopup = ({ mobile, onMinimize, zIndex, onClick, onShowPrivacyPolicy, onShowTermsOfUse }) => {
    const dragHandleRef = useRef(null);
    const popupRef = useRef(null);
    const [bounds, setBounds] = useState({ left: 0, top: 0, right: window.innerWidth, bottom: window.innerHeight });
    const [contacts, setContacts] = useState(null);

    const buttonStyle = {
        margin: '3px 0',
        width: '95%',
        height: '22px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textDecorationLine: 'underline',
        fontSize: mobile ? '10pt' : '11pt',
        border: 'solid',
        borderWidth: '1px',
        borderColor: '#000000',
        textDecoration: 'none',
        fontSize: '9.5pt',
        cursor: 'pointer',
        letterSpacing: -0.2
    }
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

    useEffect(() => {
        cmsContactDataPromise.then(data => {
            setContacts(data);
        }).catch(error => {
            console.error('Failed to load contact data:', error);
        });
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

    if (!contacts) {
        return null;
    }

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
                    width: mobile ? window.innerWidth / 1.2 : window.innerWidth / 5,
                }}
            >
                <div
                    ref={dragHandleRef}
                    className="drag-handle"
                    style={{
                        position: 'absolute',
                        top: '-1px',
                        left: '-0.5px',
                        right: '-0.5px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        backgroundColor: '#000000',
                        height: '30px',
                        padding: '0px 5px',
                        cursor: 'move',
                        zIndex: 2
                    }}
                >
                    <img src={move} style={{ width: '21px', height: '21px', pointerEvents: 'none' }} />
                    <h3 style={{ fontSize: '10pt' }}>CONTACT</h3>
                    <div
                        style={{
                            position: 'relative',
                            cursor: 'pointer',
                        }}
                        onClick={handleMinimizeClick}
                        onTouchStart={handleMinimizeClick}
                    >
                        <img
                            src={minimise}
                            style={{ width: '23px', height: '23px', pointerEvents: 'none', marginBottom: '-4px' }}
                        />
                        <div style={{
                            content: '""',
                            position: 'absolute',
                            top: '-10px',
                            bottom: '-10px',
                            left: '-10px',
                            right: '-10px',
                        }}></div>
                    </div>
                </div>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    paddingTop: '48px',
                    paddingBottom: '20px',
                    paddingLeft: '20px',
                    paddingRight: '20px',
                }}>
                    {contacts.email && (
                        <h2 onClick={() => window.location.href = `mailto:${contacts.email}`} style={buttonStyle}>
                            <a style={{ color: '#000000', textDecoration: 'none' }}>EMAIL</a>
                        </h2>
                    )}
                    {contacts.jobsEmail && (
                        <h2 onClick={() => window.location.href = `mailto:${contacts.jobsEmail}`} style={buttonStyle}>
                            <a style={{ color: '#000000', textDecoration: 'none' }}>JOBS</a>
                        </h2>
                    )}
                    {contacts.otherLinks && contacts.otherLinks.map((link, index) => (
                        <h2 onClick={() => window.open(link.url, '_blank')} style={buttonStyle}>
                            <a target='blank' style={{ color: '#000000', textDecoration: 'none' }}>{link.name}</a>
                        </h2>
                    ))}
                    <h2 onClick={onShowPrivacyPolicy} style={buttonStyle}>
                        <a style={{ color: '#000000', textDecoration: 'none' }}>PRIVACY POLICY</a>
                    </h2>
                    <h2 onClick={onShowTermsOfUse} style={buttonStyle}>
                        <a style={{ color: '#000000', textDecoration: 'none' }}>TERMS OF USE</a>
                    </h2>
                </div>
            </div>
        </Draggable>
    );
};

export default ContactPopup;
