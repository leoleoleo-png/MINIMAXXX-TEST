import React, { useRef, useState, useEffect } from 'react';
import Draggable from 'react-draggable';
import './App.css';
import move from './assets/move.png';
import minimise from './assets/minimise.png';
import cmsContactDataPromise from './cms/cmsContact'; // Importing the CMS data

const ContactPopup = ({ mobile, onMinimize, zIndex, onClick }) => {
    const dragHandleRef = useRef(null);
    const popupRef = useRef(null);
    const [bounds, setBounds] = useState({ left: 0, top: 0, right: window.innerWidth, bottom: window.innerHeight });
    const [contacts, setContacts] = useState(null);

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
        // Fetch the contact data from the CMS
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
        return null; // Render nothing or a loading indicator while data is being fetched
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
                    <h3 style={{ fontSize: mobile ? '10pt' : '11pt' }}>CONTACT</h3>
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
                            style={{ width: '23px', height: '23px', pointerEvents: 'none' }}
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
                    paddingTop: '40px',
                    paddingBottom: '20px',
                    paddingLeft: '20px',
                    paddingRight: '20px',
                }}>
                    {contacts.email && (
                        <h3 style={{ margin: '12px 0', color: '#0029FF', textDecorationLine: 'underline', fontSize: mobile ? '10pt' : '11pt' }}>
                            <a href={`mailto:${contacts.email}`} style={{ color: '#0029FF', textDecoration: 'none' }}>EMAIL</a>
                        </h3>
                    )}
                    {contacts.jobsEmail && (
                        <h3 style={{ margin: '12px 0', color: '#0029FF', textDecorationLine: 'underline', fontSize: mobile ? '10pt' : '11pt' }}>
                            <a href={`mailto:${contacts.jobsEmail}`} style={{ color: '#0029FF', textDecoration: 'none' }}>JOBS</a>
                        </h3>
                    )}
                    {contacts.otherLinks && contacts.otherLinks.map((link, index) => (
                        <h3 key={index} style={{ margin: '12px 0', color: '#0029FF', textDecorationLine: 'underline', fontSize: mobile ? '10pt' : '11pt' }}>
                            <a href={link.url} target='blank' style={{ color: '#0029FF', textDecoration: 'none' }}>{link.name}</a>
                        </h3>
                    ))}
                </div>
            </div>
        </Draggable>
    );
};

export default ContactPopup;
