import React, { useRef, useState, useEffect } from 'react';
import Draggable from 'react-draggable';
import CookieConsent, { Cookies } from 'react-cookie-consent';
import ReactGA from 'react-ga4';
import move from './assets/move.png';

const enableAnalytics = () => {
    ReactGA.initialize('G-4SYSCT19H9');
    ReactGA.send('pageview');
};

const CookiesComponent = ({ mobile }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 4000);

        return () => clearTimeout(timer);
    }, []);

    const handleAccept = () => {
        enableAnalytics();
        Cookies.set('mySiteCookieConsent', 'true', { expires: 365 });
        setIsVisible(false);
    };

    const handleDecline = () => {
        Cookies.set('mySiteCookieConsent', 'false', { expires: 365 });
        setIsVisible(false);
    };

    const buttonStyle = {
        margin: '8px 0',
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
        letterSpacing: -0.2,
        background: '#FFFFFF'
    }

    if (!isVisible) return null;

    return (
        <Draggable handle=".drag-handle">
            <div
                style={{
                    position: 'fixed',
                    top: '20%',
                    left: mobile ? '5%' : '25%',
                    transform: 'translate(-50%, -50%)',
                    zIndex: 99,
                    background: '#FFFFFF',
                    border: '1px solid #000000',
                    display: 'flex',
                    flexDirection: 'column',
                    width: '300px'
                }}
            >
                <div
                    className="drag-handle"
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        backgroundColor: '#000000',
                        height: '30px',
                        cursor: 'move',
                        zIndex: 2,
                        padding: '0 5px',
                    }}
                >

                    <img src={move} alt="Move" style={{ width: '21px', height: '21px', pointerEvents: 'none' }} />
                    <h3 style={{ fontSize: '11pt', color: '#FFFFFF', margin: 0, textAlign: 'center' }}>COOKIES</h3>
                    <div style={{ width: '21px' }} />
                </div>
                <div style={{
                    padding: '20px',
                    textAlign: 'center',
                }}>
                    <h4 style={{ margin: 0, paddingBottom: '15px' }}>ALLOW COOKIES?</h4>
                   
                    <button
                        onClick={handleDecline}
                        style={buttonStyle}
                    >
                        <h4 style={{ margin: 0 }}>NO</h4>
                    </button>
                    <button
                        onClick={handleAccept}
                        style={buttonStyle}
                    >
                        <h4 style={{ margin: 0 }}>YES</h4>
                    </button>
                </div>
            </div>
        </Draggable>
    );
};

export default CookiesComponent;
