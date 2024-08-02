import React, { useRef, useState, useEffect } from 'react';
import Draggable from 'react-draggable';
import { ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css';
import './App.css';
import video from './assets/MINIMAXXX.mp4';
import move from './assets/move.png';
import resize from './assets/resize.png';
import resize_black from './assets/resize_black.png';
import minimise from './assets/minimise.png';

const Stream = ({ mobile, onMinimize, zIndex, onClick }) => {
    const [isResizing, setIsResizing] = useState(false);
    const [isOnline, setIsOnline] = useState(false);
    const [isLocked, setIsLocked] = useState(true);
    const [password, setPassword] = useState(new Array(6).fill(''));
    const [maskedPassword, setMaskedPassword] = useState(new Array(6).fill(''));
    const [wrongPassword, setWrongPassword] = useState(false);
    const dragHandleRef = useRef(null);
    const resizableBoxRef = useRef(null);
    const [bounds, setBounds] = useState({ left: 0, top: 0, right: window.innerWidth, bottom: window.innerHeight });

    const onResizeStart = () => {
        setIsResizing(true);
    };

    const onResizeStop = () => {
        setIsResizing(false);
        updateBounds();
    };

    const updateBounds = () => {
        if (resizableBoxRef.current) {
            const box = resizableBoxRef.current;
            const width = box.getBoundingClientRect().width;
            const height = box.getBoundingClientRect().height;
            setBounds({
                left: 0,
                top: 0,
                right: window.innerWidth - width / 2,
                bottom: window.innerHeight - height / 2,
            });
        }
    };

    useEffect(() => {
        updateBounds();
        window.addEventListener('resize', updateBounds);
        return () => window.removeEventListener('resize', updateBounds);
    }, []);

    const initialPosition = mobile ? { x: window.innerWidth / 11, y: window.innerHeight / 8 } : { x: (window.innerWidth - 700) / 2, y: (window.innerHeight - 450) / 2 };

    const handleMinimizeClick = (event) => {
        event.stopPropagation();
        if (onMinimize) {
            onMinimize();
        }
    };

    const handlePasswordChange = (e, index) => {
        const value = e.target.value;
        const newPass = [...password];
        const newMaskedPass = [...maskedPassword];

        if (value.match(/^[0-9]$/)) {
            newPass[index] = value;
            newMaskedPass[index] = '*';
            setPassword(newPass);
            setMaskedPassword(newMaskedPass);
            if (index < 5) {
                document.getElementById(`password-input-${index + 1}`).focus();
            }

            if (newPass.every((digit) => digit !== '')) {
                const pass = newPass.join('');
                if (pass === '123456') { // Change to your desired password
                    setIsLocked(false);
                    setWrongPassword(false);
                } else {
                    setWrongPassword(true);
                }
            } else {
                setWrongPassword(false);
            }
        } else if (value === '' && index > 0) {
            newPass[index] = '';
            newMaskedPass[index] = '';
            setPassword(newPass);
            setMaskedPassword(newMaskedPass);
            document.getElementById(`password-input-${index - 1}`).focus();
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace') {
            const newPass = [...password];
            const newMaskedPass = [...maskedPassword];
            newPass[index] = '';
            newMaskedPass[index] = '';
            setPassword(newPass);
            setMaskedPassword(newMaskedPass);
            if (index > 0) {
                document.getElementById(`password-input-${index - 1}`).focus();
            }
        }
    };

    const handlePasswordSubmit = () => {
        const pass = password.join('');
        if (pass === '123456') { // Change to your desired password
            setIsLocked(false);
            setWrongPassword(false);
        } else {
            setWrongPassword(password.every((digit) => digit !== ''));
        }
    };

    return (
        <Draggable
            handle=".drag-handle"
            disabled={isResizing}
            bounds={bounds}
            defaultPosition={initialPosition}
            onMouseDown={onClick}
        >
            <div
                ref={resizableBoxRef}
                style={{
                    width: mobile ? window.innerWidth / 1.2 : 700,
                    height: mobile ? 220 : 450,
                    position: 'relative',
                    zIndex: zIndex,
                   
                }}
            >
                <ResizableBox
                    width={mobile ? window.innerWidth / 1.2 : 700}
                    height={mobile ? 220 : 450}
                    minConstraints={mobile ? ['1%', 100] : [400, 225]}
                    maxConstraints={[1200, 675]}
                    resizeHandles={['se']}
                    handle={<div style={{ position: 'absolute', bottom: 0, right: 0, height: mobile ? '100px' : '100%', width: mobile ? '100px' : '100px', cursor: 'se-resize' }} />}
                    className="resizable-box"
                    onResizeStart={onResizeStart}
                    onResizeStop={onResizeStop}
                    onResize={updateBounds}
                >
                    <div style={{
                        width: '100%',
                        height: '100%',
                        position: 'relative',
                        background: '#CACACA',
                        display: 'flex',
                        justifyContent: 'flex-end',
                        flexDirection: 'column',
                         overflow:'hidden'
                    }}>
                        <div
                            ref={dragHandleRef}
                            className="drag-handle"
                            style={{
                                position: 'absolute',
                                top: '-1px',
                                left: '0',
                                right: '0',
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
                            <h3 style={{ fontSize: mobile ? '10pt' : '11pt' }}>{isOnline ? 'MINIMAXXX PARIS AFTERPARTY' : 'OFFLINE'}</h3>
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingRight: '5px' }}>
                                <img
                                    onClick={handleMinimizeClick}
                                    onTouchStart={handleMinimizeClick}
                                    src={minimise}
                                    style={{ width: '18px', height: '18px', cursor: 'pointer', paddingRight: '5px' }}
                                />
                                <img src={move} style={{ width: '18px', height: '18px', pointerEvents: 'none' }} />
                            </div>
                        </div>
                        {isLocked ? (
                            <div className="blink" style={{
                                width: '100%',
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: 'red'
                            }}>
                                <h2 style={{ textAlign: 'center', color: '#000000', width: mobile ? '90%' : '30%', marginBottom: mobile ? '0' : '10px' }}>ENTER PASSWORD TO UNLOCK THE STREAM</h2>
                                <div style={{ display: 'flex', gap: '10px', marginBottom: mobile ? '20px' : '40px' }}>
                                    {maskedPassword.map((digit, index) => (
                                        <input
                                            key={index}
                                            id={`password-input-${index}`}
                                            type="tel"
                                            value={digit}
                                            onChange={(e) => handlePasswordChange(e, index)}
                                            onKeyDown={(e) => handleKeyDown(e, index)}
                                            maxLength="1"
                                            autoComplete="off"
                                            style={{
                                                width: '20px',
                                                fontFamily:'nimbus-sans',
                                                fontWeight:700,
                                                height: mobile ? '30px' : '40px',
                                                textAlign: 'center',
                                                fontSize: '18px',
                                                border: 'none',
                                                borderBottom: '1.5px solid #000',
                                                backgroundColor: 'transparent',
                                                outline: 'none',
                                                borderRadius:0
                                            }}
                                        />
                                    ))}
                                </div>
                                <button onClick={handlePasswordSubmit} style={{ padding: '8px 80px', backgroundColor: '#000', color: '#fff', border: 'none', cursor: 'pointer' }}>
                                    <h3 style={{ fontSize: mobile ? '10pt' : '11pt', color: 'red', margin: 0 }}>CONFIRM</h3>
                                </button>
                                {wrongPassword && <h5 style={{ marginTop: '20px', textAlign: 'center', color: '#000000', width: '20%', fontWeight: '400', fontSize: '7pt' }}>YOU ENTERED THE WRONG PASSWORD</h5>}
                            </div>
                        ) : isOnline ? (
                            <video
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover'
                                }}
                                autoPlay
                                muted
                                loop
                            >
                                <source src={video} type="video/mp4" />
                            </video>
                        ) : (
                            <div className="blink" style={{
                                width: '100%',
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                                <h2 style={{ textAlign: 'center', color: '#000000', width: '80%' }}>THE STREAM IS CURRENTLY OFFLINE. COME BACK FOR THE NEXT EVENT OR JOIN US IN PERSON.</h2>
                                <h5 style={{ position: 'absolute', bottom: '10%', textAlign: 'center', color: '#000000', width: '70%', fontWeight: '400', fontSize: '7pt' }}>FIND INFORMATION ABOUT OUR NEXT EVENT BY MOVING THIS WINDOW OR BY HEADING TO OUR SOCIAL NETWORKS.</h5>
                            </div>
                        )}
                        <img src={resize_black} style={{ zIndex: 3, position: 'absolute', bottom: '0', right: '0', height: '18px', objectFit: 'contain', pointerEvents: 'none' }} />
                    </div>
                </ResizableBox>
            </div>
        </Draggable>
    );
};

export default Stream;
