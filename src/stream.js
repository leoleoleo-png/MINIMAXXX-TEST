import React, { useRef, useState, useEffect } from 'react';
import Draggable from 'react-draggable';
import { ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css';
import './App.css';
import move from './assets/move.png';
import resize_black from './assets/resize_black.png';
import minimise from './assets/minimise.png';
import cmsStreamDataPromise from './cms/cmsStream.js'; // Importing the CMS stream data

const Stream = ({ mobile, onMinimize, zIndex, onClick }) => {
    const [isResizing, setIsResizing] = useState(false);
    const [isOnline, setIsOnline] = useState(false);
    const [isLocked, setIsLocked] = useState(false);
    const [password, setPassword] = useState(new Array(6).fill(''));
    const [maskedPassword, setMaskedPassword] = useState(new Array(6).fill(''));
    const [wrongPassword, setWrongPassword] = useState(false);
    const [cmsPassword, setCmsPassword] = useState(''); // State variable for CMS password
    const [streamLink, setStreamLink] = useState('');
    const [streamTitle, setStreamTitle] = useState('MINIMAXXX PARIS AFTERPARTY');
    const [streamTitleOffline, setStreamTitleOffline] = useState('OFFLINE');
    const [infos, setInfos] = useState([]);
    const [infoOverlay, setInfoOverlay] = useState(false);
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

    useEffect(() => {
        cmsStreamDataPromise.then(data => {
            if (data) {
                setIsOnline(data.online);
                setIsLocked(data.online && data.secret); // Stream can only be locked if it is online
                setStreamLink(data.streamLink);
                setStreamTitle(data.streamTitle);
                setStreamTitleOffline(data.streamTitleOffline);
                setInfos(data.infos);
                setInfoOverlay(data.infoOverlay);
                setCmsPassword(data.password); // Set the CMS password here
            }
        });
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
                if (pass === cmsPassword) { // Correct reference to the state variable
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
                        overflow: 'hidden'
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
                            <h3 style={{ fontSize: mobile ? '10pt' : '11pt' }}>
                                {isOnline ? streamTitle : streamTitleOffline}
                            </h3>
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
                        {isOnline ? (
                            isLocked ? (
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
                                    <div style={{ display: 'flex', gap: '10px', marginBottom: mobile ? '10px' : '20px' }}>
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
                                                    fontFamily: 'nimbus-sans',
                                                    fontWeight: 700,
                                                    height: mobile ? '30px' : '40px',
                                                    textAlign: 'center',
                                                    fontSize: '18px',
                                                    border: 'none',
                                                    borderBottom: '1.5px solid #000',
                                                    backgroundColor: 'transparent',
                                                    outline: 'none',
                                                    borderRadius: 0
                                                }}
                                            />
                                        ))}
                                    </div>
                                    {wrongPassword && <h5 style={{ textAlign: 'center', color: '#000000', width: '20%', fontWeight: '400', fontSize: '7pt' }}>YOU ENTERED THE WRONG PASSWORD</h5>}
                                </div>
                            ) : (
                                <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                                    <iframe
                                        src={streamLink}
                                        title="Live Stream"
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            border: 'none',
                                            objectFit: 'cover',
                                        }}
                                        allow="autoplay; fullscreen"
                                    />
                                    {infoOverlay && (
                                        <div style={{
                                            position: 'absolute',
                                            top: '10px',
                                            left: '10px',
                                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                            color: 'white',
                                            padding: '10px',
                                            borderRadius: '5px',
                                            zIndex: 4,
                                            maxWidth: '90%',
                                        }}>
                                            {infos.map((info, index) => (
                                                <p key={index} style={{ margin: 0, fontSize: '10pt' }}>• {info}</p>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )
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
